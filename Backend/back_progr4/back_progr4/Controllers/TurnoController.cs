using Auth.Utils;
using back_progr4.ENUMS;
using back_progr4.Models.Turno;
using back_progr4.Models.Turno.DTOs;
using back_progr4.Models.Turno.DTOs.back_progr4.Models.Turno.DTOs;
using back_progr4.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace back_progr4.Controllers
{
    [Route("api/turnos")]
    [ApiController]
    public class TurnoController : ControllerBase
    {
        private readonly TurnoService _turnoService;

        public TurnoController(TurnoService turnoService)
        {
            _turnoService = turnoService;
        }

        [HttpGet]
        [Authorize(Roles = $"{ROLE.MOD}, {ROLE.ADMIN}")]
        [ProducesResponseType(typeof(List<TurnoDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<List<TurnoDTO>>> GetAll()
        {
            try
            {
                var turnos = await _turnoService.GetAll();
                return Ok(turnos);
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
        [ProducesResponseType(typeof(Turno), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<Turno>> GetOneById(int id)
        {
            try
            {
                var turno = await _turnoService.GetOneById(id);
                return Ok(turno);
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

        [HttpPost]
        [Authorize(Roles = $"{ROLE.MOD}, {ROLE.ADMIN}")]
        [ProducesResponseType(typeof(TurnoDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<TurnoDTO>> CreateOne([FromBody] CreateTurnoDTO createTurno)
        {
            try
            {
                var created = await _turnoService.CreateOne(createTurno);

                return Created("CreateTurno", created);
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
        [Authorize(Roles = $"{ROLE.MOD}, {ROLE.ADMIN}")]
        [ProducesResponseType(typeof(TurnoDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(HttpMessage), StatusCodes.Status500InternalServerError)]
        async public Task<ActionResult<TurnoDTO>> UpdateOne(int id, [FromBody] UpdateTurnoDTO updateTurno)
        {
            try
            {
                var updated = await _turnoService.UpdateOne(id, updateTurno);
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
                await _turnoService.DeleteOne(id);
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
