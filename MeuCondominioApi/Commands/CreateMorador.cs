using MediatR;
using MeuCondominioApi.Core;
using System;

namespace MeuCondominioApi.Commands
{
    public class CreateMorador : IRequest<Response>
    {
        public int ApartamentoId { get; }
        public string NomeCompleto { get; }
        public string DataNascimento { get; }
        public string Telefone { get; }
        public string Cpf { get; }
        public string Email { get; }

        public CreateMorador(int apartamentoId, string nomeCompleto, string dataNascimento, 
            string telefone, string cpf, string email)
        {
            ApartamentoId = apartamentoId;
            NomeCompleto = nomeCompleto;
            DataNascimento = dataNascimento;
            Telefone = telefone;
            Cpf = cpf;
            Email = email;
        }
    }
}
