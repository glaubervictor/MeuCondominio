using System;

namespace MeuCondominioApi.Models
{
    public class Morador : Base<Morador>
    {
        #region Propriedades

        public int ApartamentoId { get; set; }
        public string NomeCompleto { get; set; }
        public DateTime DataNascimento { get; set; }
        public string DataNascimentoFormatada { get { return DataNascimento.ToString("dd/MM/yyyy"); } }
        public string Telefone { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }

        #endregion
    }
}
