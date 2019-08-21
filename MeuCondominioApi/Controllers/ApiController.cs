using MeuCondominioApi.Core;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace MeuCondominioApi.Controllers
{
    public abstract class ApiController : ControllerBase
    {
        protected bool IsValidOperation(Response response)
        {
            return (!response.Errors.Any());
        }

        protected new IActionResult Response(object result = null)
        {
            return Ok(new
            {
                success = true,
                content = result
            });
        }

        protected new IActionResult Response(Response response)
        {
            if (IsValidOperation(response))
            {
                return Ok(new
                {
                    success = true,
                    content = response.Result
                });
            }
            else
            {
                return BadRequest(new
                {
                    success = false,
                    errors = response.Errors
                });
            }
        }
    }
}
