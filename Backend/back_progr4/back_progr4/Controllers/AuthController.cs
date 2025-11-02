using Auth.Utils;
using back_progr4.Models.User.DTOs;
using back_progr4.Models.User;
using back_progr4.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using back_progr4.Models.Role;
using back_progr4.ENUMS;

namespace back_progr4.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthServices _authServices;

        public AuthController(AuthServices authServices)
        {
            _authServices = authServices;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(User), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<User>> Register([FromBody] RegisterDTO register)
        {
            try
            {
                var created = await _authServices.Register(register);
                return Created("Register", created);
            }
            catch (HttpResponseError ex)
            {
                return StatusCode(
                    (int)ex.StatusCode,
                    new HttpMessage(ex.Message)
                );
            }
            catch (Exception ex)
            {
                return StatusCode(
                    (int)HttpStatusCode.InternalServerError,
                    new HttpMessage(ex.Message)
                );
            }
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(LoginResponseDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginDTO login)
        {
            try
            {
                var res = await _authServices.Login(login, HttpContext);
                return Ok(res);
            }
            catch (HttpResponseError ex)
            {
                return StatusCode(
                    (int)ex.StatusCode,
                    new HttpMessage(ex.Message)
                );
            }
            catch (Exception ex)
            {
                return StatusCode(
                    (int)HttpStatusCode.InternalServerError,
                    new HttpMessage(ex.Message)
                );
            }
        }

        [HttpPost("logout")]
        [Authorize]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult> Logout()
        {
            try
            {
                await _authServices.Logout(HttpContext);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(
                    (int)HttpStatusCode.InternalServerError,
                    new HttpMessage(ex.Message)
                );
            }
        }

        [HttpGet("health")]
        [Authorize]
        [ApiExplorerSettings(IgnoreApi = true)]
        public bool Health()
        {
            return true;
        }

        [HttpGet("users")]
        [Authorize(Roles = $"{ROLE.MOD}, {ROLE.ADMIN}")]
        async public Task<ActionResult<List<UserWithoutPassDTO>>> GetUsers()
        {
            try
            {
                var users = await _authServices.GetUsers();
                return Ok(users);
            }
            catch (HttpResponseError ex)
            {
                return StatusCode(
                    (int)ex.StatusCode,
                    new HttpMessage(ex.Message)
                );
            }
            catch (Exception ex)
            {
                return StatusCode(
                    (int)HttpStatusCode.InternalServerError,
                    new HttpMessage(ex.Message)
                );
            }
        }
    }
}
