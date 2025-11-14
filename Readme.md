# README - Guía de Instalación y Configuración del Proyecto

## Descripción General

Este proyecto es una aplicación full-stack para gestión de reservas y turnos, compuesta por:

- **Backend**: API REST en ASP.NET Core con Entity Framework Core y SQL Server [1](#0-0)
- **Frontend**: Aplicación React con TypeScript y Vite [2](#0-1)

---

## Requisitos Previos

### Backend

- **.NET 6.0 SDK o superior**
- **SQL Server** (LocalDB, Express o versión completa)
- **Visual Studio 2022** o **Visual Studio Code** con extensión C#

### Frontend

- **Node.js 18.x o superior**
- **npm** o **yarn**

---

## Configuración del Backend

### 1. Clonar el Repositorio

```bash
git clone https://github.com/lucasmquinteros/TP_Programacion_4.git
cd TP_Programacion_4/Backend/back_progr4/back_progr4
```

### 2. Configurar la Cadena de Conexión

Edita el archivo `appsettings.json` y configura tu cadena de conexión a SQL Server: <cite/>

```json
{
  "ConnectionStrings": {
    "authConnection": "Server=(localdb)\\mssqllocaldb;Database=TurnosDB;Trusted_Connection=True;"
  },
  "Secrets": {
    "JWT": "tu_clave_secreta_jwt_aqui_minimo_32_caracteres"
  }
}
```

### 3. Aplicar Migraciones de Base de Datos

```bash
dotnet ef database update
```

Si no tienes `dotnet-ef` instalado:

```bash
dotnet tool install --global dotnet-ef
```

### 4. Ejecutar el Backend

```bash
dotnet run
```

El backend estará disponible en:

- **HTTPS**: `https://localhost:7xxx`
- **HTTP**: `http://localhost:5xxx`
- **Swagger UI**: `https://localhost:7xxx/swagger` [3](#0-2)

---

## Configuración del Frontend

### 1. Navegar al Directorio del Frontend

```bash
cd ../../app
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar la URL del Backend

Verifica que la URL del backend en tu configuración de CORS coincida con el puerto del frontend. El backend está configurado para aceptar peticiones desde `http://localhost:5173`: [4](#0-3)

Si necesitas cambiar el puerto del frontend, actualiza también la configuración de CORS en `Program.cs`.

### 4. Ejecutar el Frontend

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` <cite/>

---

## Arquitectura del Sistema

### Backend - Servicios Principales

El backend utiliza inyección de dependencias para los siguientes servicios: [5](#0-4)

- **`UserServices`**: Gestión de usuarios
- **`AuthServices`**: Autenticación y autorización JWT
- **`TurnoService`**: Gestión de turnos y disponibilidad
- **`ReservaService`**: Gestión de reservas [6](#0-5)
- **`LimpiadorReservasAntiguasService`**: Worker service para limpieza automática

### Autenticación

El sistema utiliza JWT Bearer tokens con cookies HTTP-only: [7](#0-6)

---

## Verificación de la Instalación

### 1. Verificar Backend

- Accede a `https://localhost:7xxx/swagger`
- Deberías ver la documentación de la API con todos los endpoints disponibles

### 2. Verificar Frontend

- Accede a `http://localhost:5173`
- La aplicación debería cargar correctamente

### 3. Probar la Conexión

- Intenta registrar un usuario desde el frontend
- Verifica que la petición llegue al backend y se guarde en la base de datos

---

## Solución de Problemas Comunes

### Error de Conexión a Base de Datos

- Verifica que SQL Server esté ejecutándose
- Confirma que la cadena de conexión sea correcta
- Ejecuta `dotnet ef database update` nuevamente

### Error de CORS

- Asegúrate de que el puerto del frontend (`5173`) coincida con la configuración en `Program.cs` línea 101 [8](#0-7)

### Error de JWT

- Verifica que la clave secreta JWT en `appsettings.json` tenga al menos 32 caracteres [9](#0-8)

---

## Próximos Pasos

Una vez que el proyecto esté funcionando:

1. Revisa el README del frontend para entender los flujos de usuario
2. Revisa el README del backend para entender la arquitectura de servicios y DTOs
3. Explora la documentación de Swagger para conocer todos los endpoints disponibles

---

## Notas

El proyecto utiliza AutoMapper para transformaciones entre entidades y DTOs [10](#0-9) , y Entity Framework Core con SQL Server como base de datos. El frontend está construido con React + TypeScript usando Vite como bundler [11](#0-10) . La autenticación se maneja mediante JWT tokens almacenados en cookies HTTP-only para mayor seguridad.

### Citations

**File:** Backend/back_progr4/back_progr4/Program.cs (L42-54)

```csharp
builder.Services.AddScoped<UserServices>();
builder.Services.AddScoped<AuthServices>();
builder.Services.AddScoped<IEncoderServices, EncoderServices>();
builder.Services.AddScoped<RoleServices>();
builder.Services.AddScoped<TurnoService>();
builder.Services.AddScoped<ReservaService>();
builder.Services.AddHostedService<LimpiadorReservasAntiguasService>();

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<ITurnoRepository, TurnoRepository>();
builder.Services.AddScoped<IReservaRepository, ReservaRepository>();
```

**File:** Backend/back_progr4/back_progr4/Program.cs (L56-56)

```csharp
builder.Services.AddAutoMapper(opts => { }, typeof(Mapping));
```

**File:** Backend/back_progr4/back_progr4/Program.cs (L58-61)

```csharp
builder.Services.AddDbContext<AplicationDbContext>(opts =>
{
    opts.UseSqlServer(builder.Configuration.GetConnectionString("authConnection"));
});
```

**File:** Backend/back_progr4/back_progr4/Program.cs (L65-66)

```csharp
var secret = builder.Configuration.GetSection("Secrets:JWT")?.Value?.ToString() ?? string.Empty;
var key = Encoding.UTF8.GetBytes(secret);
```

**File:** Backend/back_progr4/back_progr4/Program.cs (L68-93)

```csharp
builder.Services.AddAuthentication(opts =>
{
    opts.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    opts.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
    .AddJwtBearer(opts =>
    {
        opts.SaveToken = true;
        opts.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,

        };
    })
    .AddCookie(opts =>
    {
        opts.Cookie.HttpOnly = true;
        opts.Cookie.SameSite = SameSiteMode.None;
        opts.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        opts.ExpireTimeSpan = TimeSpan.FromDays(1);
    });
```

**File:** Backend/back_progr4/back_progr4/Program.cs (L96-102)

```csharp
app.UseCors(opts =>
{
    opts.AllowAnyMethod();
    opts.AllowAnyHeader();
    opts.AllowCredentials();
    opts.WithOrigins("http://localhost:5173");
});
```

**File:** Backend/back_progr4/back_progr4/Program.cs (L105-109)

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

**File:** app/README.md (L1-8)

```markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
```

**File:** Backend/back_progr4/back_progr4/Services/ReservaService.cs (L11-24)

```csharp
    public class ReservaService
    {
        private readonly AplicationDbContext _db;
        private readonly IMapper _mapper;
        private readonly TurnoService _turnoService;
        private readonly UserServices _userServices;

        public ReservaService(AplicationDbContext db, IMapper mapper, TurnoService turnoService, UserServices userServices)
        {
            _mapper = mapper;
            _db = db;
            _turnoService = turnoService;
            _userServices = userServices;
        }
```
