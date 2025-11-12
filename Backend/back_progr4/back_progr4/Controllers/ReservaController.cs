using Auth.Utils;
using AutoMapper;
using back_progr4.Config;
using back_progr4.Models.Reserva;
using back_progr4.Models.Reserva.DTOs;
using back_progr4.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using back_progr4.ENUMS;
using back_progr4.Models.User.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;

namespace back_progr4.Controllers
{
    [Route("api/reservas")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        private readonly ReservaService _reservaService;

        public ReservaController(ReservaService reservaService)
        {
            _reservaService = reservaService;
        }

        [HttpGet("today")]
        [Authorize(Roles = $"{ROLE.MOD}, {ROLE.ADMIN}")]
        [ProducesResponseType(typeof(List<ReservaDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<List<ReservaDTO>>> GetAllToday()
        {
            try
            {
                var res = await _reservaService.GetAllToday();
                return Ok(res);
            }
            catch (HttpResponseError ex)
            {
                return StatusCode((int)ex.StatusCode, new HttpMessage(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new HttpMessage(ex.Message));
            }
        }

        [HttpGet("byday")]
        [Authorize(Roles = $"{ROLE.MOD}, {ROLE.ADMIN}")]
        [ProducesResponseType(typeof(List<ReservaDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<List<ReservaDTO>>> GetAllByDay([FromQuery] DateTime date)
        {
            try
            {
                var res = await _reservaService.GetAllByDay(date);
                return Ok(res);
            }
            catch (HttpResponseError ex)
            {
                return StatusCode((int)ex.StatusCode, new HttpMessage(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new HttpMessage(ex.Message));
            }
        }
        [HttpGet("user")]
        [Authorize]
        [ProducesResponseType(typeof(List<ReservaDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status403Forbidden)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<List<ReservaDTO>>> GetAllByUserId(int userId) 
        {
            try
            {
                var res = await _reservaService.GetAllByUserID(userId);
                return Ok(res);
            }
            catch (HttpResponseError ex)
            {
                return StatusCode((int)ex.StatusCode, new HttpMessage(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new HttpMessage(ex.Message));
            }
        }


        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(typeof(Reserva), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<Reserva>> GetOneById(int id)
        {
            try
            {
                var res = await _reservaService.GetOneById(id);
                return Ok(res);
            }
            catch (HttpResponseError ex)
            {
                return StatusCode((int)ex.StatusCode, new HttpMessage(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new HttpMessage(ex.Message));
            }
        }
        [HttpGet("user")]
        [Authorize]
        [ProducesResponseType(typeof(List<ReservaDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status403Forbidden)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(ReservaDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<ReservaDTO>> CreateOne([FromBody] CreateReservaDTO createReserva)
        {
            try
            {
                var created = await _reservaService.CreateOne(createReserva);

                // Si ReservaDTO tiene Id, mejor usar CreatedAtAction:
                // return CreatedAtAction(nameof(GetOneById), new { id = created.Id }, created);
                return Created("CreateReserva", created);
            }
            catch (HttpResponseError ex)
            {
                return StatusCode((int)ex.StatusCode, new HttpMessage(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new HttpMessage(ex.Message));
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(typeof(ReservaDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<ReservaDTO>> UpdateOne(int id, [FromBody] UpdateReservaDTO updateReserva)
        {
            try
            {
                var updated = await _reservaService.UpdateOne(id, updateReserva);
                return Ok(updated);
            }
            catch (HttpResponseError ex)
            {
                return StatusCode((int)ex.StatusCode, new HttpMessage(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new HttpMessage(ex.Message));
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = $"{ROLE.ADMIN}")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult> DeleteOne(int id)
        {
            try
            {
                await _reservaService.DeleteOne(id);
                return Ok();
            }
            catch (HttpResponseError ex)
            {
                return StatusCode((int)ex.StatusCode, new HttpMessage(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new HttpMessage(ex.Message));
            }
        }
    }
}
