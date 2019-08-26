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

        
        public IEnumerable<Morador> GetAll()
        {
            return _contexto.Moradores.OrderBy(c => c.NomeCompleto);
        }

        public IEnumerable<Morador> GetByDescription(string description)
        {
            return _contexto.Moradores.Where(
                m => m.Cpf == description 
                || m.NomeCompleto.Contains(description) 
                || m.Email == description);
        }

        public Morador GetById(int id)
        {
            return _contexto.Moradores.Find(id);
        }

        #endregion
    }
}
