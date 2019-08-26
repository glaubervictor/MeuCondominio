using MeuCondominioApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MeuCondominioApi.Services
{
    public class ApartamentoService : IApartamentoService
    {
        #region Membros

        private readonly ContextoDados _contexto;

        #endregion

        #region Construtor

        public ApartamentoService(
            ContextoDados contexto)
        {
            _contexto = contexto;
        }

        #endregion

        #region Métodos

        public Apartamento GetById(int id)
        {
            return _contexto.Apartamentos.Find(id);
        }

        public IEnumerable<Apartamento> GetAll()
        {
            return _contexto.Apartamentos.OrderBy(c => c.Numero);
        }

        public void Dispose()
        {
            _contexto.Dispose();
        }

        #endregion

    }
}
