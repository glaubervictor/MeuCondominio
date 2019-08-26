using FluentAssertions;
using MeuCondominioTestes.Fixtures;
using MeuCondominioTestes.Helpers;
using System.Net;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Xunit;

namespace MeuCondominioTestes.Scenarios
{
    public class MoradorTests
    {
        private readonly TestContext _testContext;


        public MoradorTests()
        {
            _testContext = new TestContext();
        }

        [Fact]
        public async Task Apartamentos_Get_ReturnsOkResponse()
        {
            var client = _testContext.Client;
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", new Auth().GetToken());

            var response = await client.GetAsync("/api/moradores");
            response.EnsureSuccessStatusCode();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}
