using MeuCondominioApi.Models;
using System;
using System.Collections.Generic;

namespace MeuCondominioApi.Services
{
    public interface IMoradorService
    {
        Morador GetById(int id);
        IEnumerable<Morador> GetAll();
        IEnumerable<Morador> GetByDescription(string description);
    }
}
