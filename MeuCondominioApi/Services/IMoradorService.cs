using MeuCondominioApi.Models;
using System;
using System.Collections.Generic;

namespace MeuCondominioApi.Services
{
    public interface IMoradorService
    {
        Morador GetById(Guid id);
        IEnumerable<Morador> GetAll();
    }
}
