﻿using FluentAssertions;
using System.Net;
using System.Threading.Tasks;
using MeuCondominioTestes.Fixtures;
using Xunit;
using System.Net.Http.Headers;
using MeuCondominioTestes.Helpers;

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
            var client = _testContext.Client;
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", new Auth().GetToken());

            var response = await client.GetAsync("/api/apartamentos");
            response.EnsureSuccessStatusCode();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}
