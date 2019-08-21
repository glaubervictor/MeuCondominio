using MediatR;
using MeuCondominioApi.Core;
using System;

namespace MeuCondominioApi.Commands
{
    public class UpdateMorador : IRequest<Response>
    {
        public Guid Id { get; set; }
        public Guid ApartamentoId { get; }
        public string NomeCompleto { get; }
        public DateTime DataNascimento { get; }
        public string Telefone { get; }
        public string Cpf { get; }
        public string Email { get; }

        public UpdateMorador(Guid id, Guid apartamentoId, string nomeCompleto, DateTime dataNascimento, string telefone, string cpf, string email)
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
