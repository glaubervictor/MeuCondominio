using MeuCondominioApi.Models;
using System;
using System.Collections.Generic;

namespace MeuCondominioApi.Services
{
    public interface IApartamentoService : IDisposable
    {
        Apartamento GetById(int id);
        IEnumerable<Apartamento> GetAll();
    }
}
