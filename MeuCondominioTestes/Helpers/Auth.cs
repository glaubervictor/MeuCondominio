using MeuCondominioTestes.Fixtures;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Text;

namespace MeuCondominioTestes.Helpers
{
    public class Auth
    {
        private readonly TestContext _testContext;
        public Auth()
        {
            _testContext = new TestContext();
        }

        public string GetToken()
        {
            string json = JsonConvert.SerializeObject(new { email = "joao@gmail.com", senha = "Abc1234@" }, Formatting.Indented);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var response = _testContext.Client.PostAsync("api/autenticacao", httpContent).Result;
            dynamic values = JObject.Parse(response.Content.ReadAsStringAsync().Result);

            return Convert.ToString(values.content.token);
        }
    }
}
