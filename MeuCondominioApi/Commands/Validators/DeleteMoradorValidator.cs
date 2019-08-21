using FluentValidation;

namespace MeuCondominioApi.Commands.Validators
{
    public class DeleteMoradorValidator : AbstractValidator<DeleteMorador>
    {
        public DeleteMoradorValidator()
        {
            RuleFor(c => c.Id)
                .NotEmpty().WithMessage("O campo id é obrigatório.");
        }
    }
}
