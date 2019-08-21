using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeuCondominioApi.Commands.Validators
{
    public class DeleteApartamentoValidator : AbstractValidator<UpdateApartamento>
    {
        public DeleteApartamentoValidator()
        {
            RuleFor(c => c.Id)
                .NotEmpty().WithMessage("O campo Id é obrigatório.");

        }
    }
}
