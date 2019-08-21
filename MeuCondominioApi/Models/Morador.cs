using System;

namespace MeuCondominioApi.Models
{
    public class Morador : Base<Morador>
    {
        #region Propriedades

        public Guid ApartamentoId { get; set; }
        public string NomeCompleto { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Telefone { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }

        #endregion
    }
}
