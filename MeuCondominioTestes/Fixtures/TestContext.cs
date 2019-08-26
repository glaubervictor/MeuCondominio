using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System.Net.Http;
using MeuCondominioApi;
using Microsoft.Extensions.Configuration;
using System;

namespace MeuCondominioTestes.Fixtures
{

    public class TestContext
    {
        public HttpClient Client { get; set; }
        private TestServer _server;

        public static IConfigurationRoot GetIConfigurationRoot(string outputPath)
        {
            return new ConfigurationBuilder()
                .SetBasePath(outputPath)
                .AddJsonFile("appsettings.json", optional: true)
                .AddEnvironmentVariables()
                .Build();
        }

        public TestContext()
        {
            SetupClient();
        }
        private void SetupClient()
        {
            _server = new TestServer(
                new WebHostBuilder()
                .UseStartup<Startup>()
                .UseConfiguration(GetIConfigurationRoot(AppDomain.CurrentDomain.BaseDirectory)));

            Client = _server.CreateClient();
        }
    }
}
