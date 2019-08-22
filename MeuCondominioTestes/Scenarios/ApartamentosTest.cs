using FluentAssertions;
using System.Net;
using System.Threading.Tasks;
using MeuCondominioTestes.Fixtures;
using Xunit;

namespace MeuCondominioTestes.Scenarios
{
    public class ApartamentosTest
    {
        private readonly TestContext _testContext;
        public ApartamentosTest()
        {
            _testContext = new TestContext();
        }

        [Fact]
        public async Task Apartamentos_Get_ReturnsOkResponse()
        {
            _testContext.Client.DefaultRequestHeaders.Add("Authorization", "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OTk3NTg0My1hMWRkLTQzMjgtOTBhMy0xMDRjNzU3ZmI4MTciLCJ1c2VySWQiOiIxMDYxNjg2My0yMTIxLTRiNTUtYjZkMC0wOGQ3MjY5NDFjNjgiLCJyb2xlIjoidXN1YXJpbyIsIm5iZiI6MTU2NjQzNDgyMywiZXhwIjoxNTc0MzgzNjIzLCJpYXQiOjE1NjY0MzQ4MjMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Ik1ldUNvbmRvbWluaW8ifQ.uHJ7VdOL9cX9o-4Y-mGHVVtlSLd7BIFlF4fn0T1NAEYv3jRPcV8DO0HsNGABnD8PC6Hjt_jA1L0SecAWrDDKGA");

            var response = await _testContext.Client.GetAsync("/api/apartamentos");
            response.EnsureSuccessStatusCode();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task Apartamentos_GetById_ReturnsOkResponse()
        {
            var response = await _testContext.Client.GetAsync("/api/apartamentos/b8d1480e-404c-49c5-8d2e-5a68e3d3b50f");
            response.EnsureSuccessStatusCode();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task Apartamentos_GetById_ReturnsBadRequestResponse()
        {
            var response = await _testContext.Client.GetAsync("/api/values/AAA");
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }
    }
}
