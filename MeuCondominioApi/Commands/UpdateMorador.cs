using MediatR;
using MeuCondominioApi.Core;
using System;

namespace MeuCondominioApi.Commands
{
    public class UpdateMorador : IRequest<Response>
    {
        public int Id { get; set; }
        public int ApartamentoId { get; }
        public string NomeCompleto { get; }
        public string DataNascimento { get; }
        public string Telefone { get; }
        public string Cpf { get; }
        public string Email { get; }

        public UpdateMorador(int id, int apartamentoId, string nomeCompleto, string dataNascimento,
            string telefone, string cpf, string email)
        {
            Id = id;
            ApartamentoId = apartamentoId;
            NomeCompleto = nomeCompleto;
            DataNascimento = dataNascimento;
            Telefone = telefone;
            Cpf = cpf;
            Email = email;
        }
    }
}
