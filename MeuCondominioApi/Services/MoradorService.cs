using System;
using System.Collections.Generic;
using System.Linq;
using MeuCondominioApi.Models;

namespace MeuCondominioApi.Services
{
    public class MoradorService : IMoradorService
    {
        #region Membros

        private readonly ContextoDados _contexto;

        #endregion

        #region Construtor

        public MoradorService(
            ContextoDados contexto)
        {
            _contexto = contexto;
        }

        #endregion

        #region Métodos

        public void Dispose()
        {
            _contexto.Dispose();
        }

        
        IEnumerable<Morador> IMoradorService.GetAll()
        {
            return _contexto.Moradores.OrderBy(c => c.NomeCompleto);
        }

        Morador IMoradorService.GetById(Guid id)
        {
            return _contexto.Moradores.Find(id);
        }

        #endregion
    }
}
