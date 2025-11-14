# Documentación Técnica del Backend - Sistema de Reservas Sky Jump Park

## Resumen Ejecutivo

El backend es una API REST construida en ASP.NET Core que implementa un sistema de gestión de reservas con autenticación dual (JWT + Cookies), autorización basada en roles, y arquitectura en capas.

---

## Arquitectura General del Sistema

### Diagrama de Capas

```mermaid
graph TB
    subgraph Presentation["Capa de Presentación"]
        AC["AuthController<br/>/api/auth"]
        RC["ReservasController<br/>/api/reservas"]
        TC["TurnoController<br/>/api/turnos"]
    end

    subgraph Services["Capa de Servicios"]
        AS["AuthServices"]
        US["UserServices"]
        RS["ReservaService"]
        TS["TurnoService"]
        RLS["RoleServices"]
        ES["IEncoderServices"]
    end

    subgraph Repositories["Capa de Repositorios"]
        UR["IUserRepository"]
        RR["IReservaRepository"]
        TR["ITurnoRepository"]
        ROR["IRoleRepository"]
        GR["Repository&lt;T&gt;"]
    end

    subgraph Data["Capa de Datos"]
        DB["ApplicationDbContext"]
        SQL[("SQL Server")]
    end

    subgraph Infrastructure["Infraestructura"]
        JWT["JWT Token"]
        COOKIE["Cookie Auth"]
        MAPPER["AutoMapper"]
        WORKER["LimpiadorReservasService"]
    end

    AC --> AS
    RC --> RS
    TC --> TS

    AS --> US
    AS --> ES
    RS --> TS
    RS --> US

    US --> UR
    RS --> DB
    TS --> DB

    UR --> GR
    RR --> GR
    TR --> GR
    ROR --> GR

    GR --> DB
    DB --> SQL

    AS -.-> JWT
    AS -.-> COOKIE
    US -.-> MAPPER
```

---

## Diagrama de Clases - Modelo de Dominio

### Entidades Principales

```mermaid
classDiagram
    class User {
        +int Id
        +string UserName
        +string Email
        +string Password
        +List~Role~ Roles
        +List~Reserva~ Reservas
    }

    class Role {
        +int Id
        +string Name
        +string Description
    }

    class Reserva {
        +int Id
        +int UserId
        +int TurnoId
        +DateTime FechaReserva
        +int Cantidad
        +double Precio
        +string Estado
        +User User
        +Turno Turno
    }

    class Turno {
        +int Id
        +DateTime Fecha
        +TimeOnly HoraInicio
        +TimeOnly HoraFin
        +int CupoMax
        +int CuposDisponibles
        +string Estado
        +List~Reserva~ Reservas
    }

    class UserRoles {
        +int UserId
        +int RoleId
    }

    User "1" --> "N" Reserva : hace
    Turno "1" --> "N" Reserva : contiene
    User "N" --> "N" Role : tiene
```

### Relaciones y Restricciones

Las relaciones están configuradas en `ApplicationDbContext.OnModelCreating`:

**Restricciones Clave:**

- **Unique Index**: `User.UserName`, `User.Email`, `Role.Name`
- **Composite Unique**: `(UserId, TurnoId)` en Reserva, `(Fecha, HoraInicio)` en Turno
- **Delete Behavior**: `Restrict` para prevenir eliminaciones en cascada

---

## Sistema de Seguridad

### 1. Autenticación Dual (JWT + Cookies)

El sistema implementa **dos mecanismos de autenticación simultáneos** para máxima compatibilidad:

```mermaid
graph TB
    subgraph Config["Configuración de Autenticación"]
        DEFAULT["DefaultAuthenticateScheme:<br/>Cookie"]
        CHALLENGE["DefaultChallengeScheme:<br/>JwtBearer"]
        SCHEME["DefaultScheme:<br/>Cookie"]
    end

    subgraph JWT["JWT Bearer"]
        JWTCONFIG["TokenValidationParameters"]
        ISSUERKEY["ValidateIssuerSigningKey: true"]
        SIGNINGKEY["IssuerSigningKey:<br/>256 bits"]
        LIFETIME["ValidateLifetime: true"]
    end

    subgraph Cookie["Cookie Configuration"]
        HTTPONLY["HttpOnly: true"]
        SAMESITE["SameSite: None"]
        SECURE["SecurePolicy: Always"]
        EXPIRE["ExpireTimeSpan: 1 day"]
    end

    DEFAULT --> JWTCONFIG
    CHALLENGE --> JWTCONFIG

    JWTCONFIG --> ISSUERKEY
    JWTCONFIG --> SIGNINGKEY
    JWTCONFIG --> LIFETIME

    SCHEME --> HTTPONLY
    SCHEME --> SAMESITE
    SCHEME --> SECURE
    SCHEME --> EXPIRE
```

#### Configuración JWT

**Parámetros de Validación:**

- `ValidateIssuerSigningKey: true` - Valida la firma del token
- `IssuerSigningKey` - Clave simétrica de 256 bits (mínimo 32 caracteres)
- `ValidateLifetime: true` - Verifica expiración del token (24 horas)
- `ValidateIssuer: false` - No valida emisor (single-tenant)
- `ValidateAudience: false` - No valida audiencia (single-tenant)

#### Configuración de Cookies

**Propiedades de Seguridad:**

- `HttpOnly: true` - Previene acceso desde JavaScript (protección XSS)
- `SameSite: None` - Permite cookies cross-site (necesario para CORS)
- `SecurePolicy: Always` - Solo transmite por HTTPS
- `ExpireTimeSpan: 1 día` - Duración de la sesión

---

### 2. Flujo de Autenticación - Registro

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthServices
    participant UserServices
    participant IEncoderServices
    participant RoleServices
    participant IUserRepository
    participant Database

    Client->>AuthController: POST /api/auth/register<br/>RegisterDTO
    AuthController->>AuthServices: Register(registerDTO)

    AuthServices->>UserServices: GetOneByEmailOrUsername(email, username)
    UserServices->>IUserRepository: GetOneAsync(predicate)
    IUserRepository->>Database: SELECT * FROM Users WHERE...
    Database-->>IUserRepository: null (no existe)
    IUserRepository-->>UserServices: null
    UserServices-->>AuthServices: null

    AuthServices->>UserServices: CreateOne(registerDTO)
    UserServices->>UserServices: Map RegisterDTO → User
    UserServices->>IEncoderServices: Encode(password)
    IEncoderServices-->>UserServices: hashedPassword
    UserServices->>RoleServices: GetOneByName("USER")
    RoleServices-->>UserServices: Role(USER)
    UserServices->>IUserRepository: CreateOneAsync(user)
    IUserRepository->>Database: INSERT INTO Users...
    Database-->>IUserRepository: User created
    IUserRepository-->>UserServices: User entity
    UserServices-->>AuthServices: UserWithoutPassDTO

    AuthServices->>AuthServices: GenerateJwt(user)
    AuthServices-->>AuthController: LoginResponseDTO<br/>(Token + User)
    AuthController-->>Client: 201 Created<br/>LoginResponseDTO
```

**Pasos del Registro:**

1. Validar que email/username no existan
2. Mapear DTO a entidad `User`
3. Hashear contraseña con BCrypt (via `IEncoderServices`)
4. Asignar rol por defecto "USER"
5. Persistir en base de datos
6. Generar JWT token
7. Retornar token + datos de usuario (sin contraseña)

---

### 3. Flujo de Autenticación - Login

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthServices
    participant UserServices
    participant IEncoderServices
    participant HttpContext
    participant Database

    Client->>AuthController: POST /api/auth/login<br/>LoginDTO
    AuthController->>AuthServices: Login(loginDTO, HttpContext)

    AuthServices->>UserServices: GetOneByEmailOrUsername(datum, datum)
    UserServices->>Database: SELECT * FROM Users<br/>WHERE Email = @datum OR UserName = @datum<br/>INCLUDE Roles, Reservas
    Database-->>UserServices: User entity (with navigations)
    UserServices-->>AuthServices: User entity

    alt User not found
        AuthServices-->>AuthController: throw HttpResponseError(400, "Invalid credentials")
        AuthController-->>Client: 400 Bad Request
    end

    AuthServices->>IEncoderServices: Verify(plainPassword, hashedPassword)
    IEncoderServices-->>AuthServices: bool isMatch

    alt Password mismatch
        AuthServices-->>AuthController: throw HttpResponseError(400, "Invalid credentials")
        AuthController-->>Client: 400 Bad Request
    end

    AuthServices->>AuthServices: SetCookie(user, HttpContext)
    Note over AuthServices,HttpContext: Crea ClaimsIdentity con:<br/>- Claim("id", userId)<br/>- Claim(ClaimTypes.Role, roleName) x N
    AuthServices->>HttpContext: SignInAsync(CookieAuthenticationDefaults)
    HttpContext-->>AuthServices: Cookie establecida

    AuthServices->>AuthServices: GenerateJwt(user)
    Note over AuthServices: Crea JWT con:<br/>- Claim("id", userId)<br/>- Claim(ClaimTypes.Role, roleName) x N<br/>- Expires: 24 horas

    AuthServices-->>AuthController: LoginResponseDTO<br/>(Token + UserWithoutPassDTO)
    AuthController-->>Client: 200 OK<br/>LoginResponseDTO + Set-Cookie header
```

**Detalles de Implementación:**

#### Verificación de Contraseña

Usa BCrypt para comparar la contraseña en texto plano con el hash almacenado.

#### Establecimiento de Cookie

**Claims incluidos:**

- `id`: ID del usuario
- `ClaimTypes.Role`: Uno por cada rol asignado (USER, ADMIN, MOD)

**Propiedades de la Cookie:**

- `IsPersistent: true` - Sobrevive al cierre del navegador
- `ExpiresUtc: 24 horas` - Duración de la sesión

#### Generación de JWT

**Estructura del Token:**

- **Header**: Algoritmo HMAC-SHA256
- **Payload**: Claims (id + roles)
- **Signature**: Firmado con clave secreta de 256 bits
- **Expiración**: 24 horas desde emisión

---

### 4. Autorización Basada en Roles

El sistema implementa **Role-Based Access Control (RBAC)** con tres roles predefinidos:

| Rol       | Descripción      | Permisos                                 |
| --------- | ---------------- | ---------------------------------------- |
| **USER**  | Usuario estándar | Crear/ver sus propias reservas           |
| **MOD**   | Moderador        | Gestionar turnos, ver todas las reservas |
| **ADMIN** | Administrador    | Acceso total al sistema                  |

**Implementación en Controllers:**

```csharp
[Authorize(Roles = "ADMIN")]
public class AdminController : ControllerBase { }

[Authorize(Roles = "ADMIN,MOD")]
public IActionResult GestionarTurnos() { }

[Authorize] // Requiere autenticación, cualquier rol
public IActionResult MiPerfil() { }
```

---

## Flujos de Negocio

### 1. Gestión de Turnos

```mermaid
sequenceDiagram
    participant Admin
    participant TurnoController
    participant TurnoService
    participant Database

    Admin->>TurnoController: POST /api/turnos<br/>CreateTurnoDTO
    TurnoController->>TurnoService: CreateTurno(dto)

    TurnoService->>Database: Verificar unicidad<br/>(Fecha, HoraInicio)

    alt Turno ya existe
        Database-->>TurnoService: Conflict
        TurnoService-->>TurnoController: HttpResponseError(409)
        TurnoController-->>Admin: 409 Conflict
    end

    TurnoService->>Database: INSERT INTO Turnos
    Database-->>TurnoService: Turno creado
    TurnoService-->>TurnoController: TurnoDTO
    TurnoController-->>Admin: 201 Created
```

### 2. Creación de Reserva

```mermaid
sequenceDiagram
    participant User
    participant ReservasController
    participant ReservaService
    participant TurnoService
    participant Database

    User->>ReservasController: POST /api/reservas<br/>CreateReservaDTO
    ReservasController->>ReservaService: CreateReserva(dto, userId)

    ReservaService->>TurnoService: GetTurnoById(turnoId)
    TurnoService->>Database: SELECT * FROM Turnos WHERE Id = @id
    Database-->>TurnoService: Turno entity

    alt Turno no existe
        TurnoService-->>ReservaService: null
        ReservaService-->>ReservasController: HttpResponseError(404)
        ReservasController-->>User: 404 Not Found
    end

    ReservaService->>ReservaService: ValidarCuposDisponibles(turno, cantidad)

    alt Cupos insuficientes
        ReservaService-->>ReservasController: HttpResponseError(400)
        ReservasController-->>User: 400 Bad Request
    end

    ReservaService->>Database: Verificar reserva duplicada<br/>(UserId, TurnoId)

    alt Ya tiene reserva
        Database-->>ReservaService: Conflict
        ReservaService-->>ReservasController: HttpResponseError(409)
        ReservasController-->>User: 409 Conflict
    end

    ReservaService->>Database: BEGIN TRANSACTION
    ReservaService->>Database: INSERT INTO Reservas
    ReservaService->>Database: UPDATE Turnos<br/>SET CuposDisponibles -= cantidad
    ReservaService->>Database: COMMIT

    Database-->>ReservaService: Reserva creada
    ReservaService-->>ReservasController: ReservaDTO
    ReservasController-->>User: 201 Created
```

---

## Características Técnicas Adicionales

### 1. Worker Service - Limpieza de Reservas

```csharp
public class LimpiadorReservasAntiguasService : BackgroundService
{
    // Ejecuta cada 24 horas
    // Elimina reservas con estado "Pendiente"
    // más antiguas de 7 días
}
```

**Configuración:**

- Intervalo: 24 horas
- Criterio: Reservas pendientes > 7 días
- Acción: Soft delete (actualiza Estado a "Cancelada")

### 2. AutoMapper Profiles

**Mapeos configurados:**

- `RegisterDTO` → `User`
- `User` → `UserWithoutPassDTO`
- `CreateTurnoDTO` → `Turno`
- `Turno` → `TurnoDTO`
- `CreateReservaDTO` → `Reserva`
- `Reserva` → `ReservaDTO`

### 3. Manejo de Errores Global

```csharp
public class HttpResponseError : Exception
{
    public HttpStatusCode StatusCode { get; set; }
    public string Message { get; set; }
}
```

Todos los servicios lanzan `HttpResponseError` que es capturado por middleware global para retornar respuestas HTTP consistentes.

### 4. CORS Configuration

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // Para cookies
    });
});
```

---

## Endpoints API

### Auth Controller

| Método | Endpoint             | Autorización | Descripción                  |
| ------ | -------------------- | ------------ | ---------------------------- |
| POST   | `/api/auth/register` | Ninguna      | Registro de nuevo usuario    |
| POST   | `/api/auth/login`    | Ninguna      | Login (retorna JWT + Cookie) |
| POST   | `/api/auth/logout`   | Autenticado  | Cierra sesión                |
| GET    | `/api/auth/me`       | Autenticado  | Datos del usuario actual     |

### Turnos Controller

| Método | Endpoint           | Autorización | Descripción            |
| ------ | ------------------ | ------------ | ---------------------- |
| GET    | `/api/turnos`      | Ninguna      | Lista todos los turnos |
| GET    | `/api/turnos/{id}` | Ninguna      | Obtiene un turno       |
| POST   | `/api/turnos`      | ADMIN, MOD   | Crea nuevo turno       |
| PUT    | `/api/turnos/{id}` | ADMIN, MOD   | Actualiza turno        |
| DELETE | `/api/turnos/{id}` | ADMIN        | Elimina turno          |

### Reservas Controller

| Método | Endpoint                     | Autorización          | Descripción              |
| ------ | ---------------------------- | --------------------- | ------------------------ |
| GET    | `/api/reservas`              | ADMIN, MOD            | Lista todas las reservas |
| GET    | `/api/reservas/mis-reservas` | Autenticado           | Reservas del usuario     |
| GET    | `/api/reservas/{id}`         | Autenticado           | Obtiene una reserva      |
| POST   | `/api/reservas`              | Autenticado           | Crea reserva             |
| PUT    | `/api/reservas/{id}`         | Usuario dueño o ADMIN | Actualiza reserva        |
| DELETE | `/api/reservas/{id}`         | Usuario dueño o ADMIN | Cancela reserva          |

---

## Estructura del Proyecto

```
Backend/
├── Controllers/
│   ├── AuthController.cs
│   ├── ReservasController.cs
│   └── TurnoController.cs
├── Services/
│   ├── AuthServices.cs
│   ├── UserServices.cs
│   ├── ReservaService.cs
│   ├── TurnoService.cs
│   ├── RoleServices.cs
│   └── IEncoderServices.cs
├── Repositories/
│   ├── IUserRepository.cs
│   ├── IReservaRepository.cs
│   ├── ITurnoRepository.cs
│   ├── IRoleRepository.cs
│   └── Repository<T>.cs
├── Models/
│   ├── User.cs
│   ├── Role.cs
│   ├── Reserva.cs
│   └── Turno.cs
├── DTOs/
│   ├── Auth/
│   ├── User/
│   ├── Turno/
│   └── Reserva/
├── Config/
│   ├── ApplicationDbContext.cs
│   └── AutoMapperProfile.cs
├── Utils/
│   └── HttpResponseError.cs
├── Workers/
│   └── LimpiadorReservasAntiguasService.cs
└── Program.cs
```

---

## Consideraciones de Seguridad

1. **Passwords**: Hasheadas con BCrypt (factor de trabajo configurable)
2. **JWT Secret**: Mínimo 256 bits, almacenada en appsettings (usar secretos en producción)
3. **HTTPS Only**: Cookies configuradas con `SecurePolicy.Always`
4. **HttpOnly Cookies**: Protección contra XSS
5. **CORS**: Configurado solo para origins específicos
6. **SQL Injection**: Prevenido por Entity Framework parametrizado
7. **Authorization**: Verificación de roles en cada endpoint sensible

---

## Variables de Entorno Requeridas

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=...;Trusted_Connection=True;"
  },
  "Secrets": {
    "JWT": "tu-clave-secreta-de-al-menos-32-caracteres"
  }
}
```

---

## Tecnologías Utilizadas

- **Framework**: ASP.NET Core 8.0
- **ORM**: Entity Framework Core
- **Database**: SQL Server
- **Authentication**: JWT Bearer + Cookie Authentication
- **Password Hashing**: BCrypt.NET
- **Mapping**: AutoMapper
- **API Documentation**: Swagger/OpenAPI

---

## Instalación y Configuración

1. **Clonar repositorio**
2. **Configurar appsettings.json** con connection string y JWT secret
3. **Aplicar migraciones**:
   ```bash
   dotnet ef database update
   ```
4. **Ejecutar**:
   ```bash
   dotnet run
   ```
5. **Acceder a Swagger**: `https://localhost:5001/swagger`

---

## Autor

Sistema desarrollado para Sky Jump Park - Trabajo Práctico Programación 4
