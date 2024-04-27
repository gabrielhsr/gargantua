namespace Gargantua.Middlewares
{
    public class ODataResponseMiddleware
    {
        private readonly RequestDelegate _next;

        public ODataResponseMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Path.HasValue && context.Request.Path.Value.Contains("/odata"))
            {
                var response = context.Response;
                var originBody = response.Body;

                context.Request.EnableBuffering();

                using var newBody = new MemoryStream();

                response.Body = newBody;

                await _next(context);
                await RemoveODataPropertiesAsync(response);

                newBody.Seek(0, SeekOrigin.Begin);
                await newBody.CopyToAsync(originBody);
                response.Body = originBody;
            }
            else
            {
                await _next(context);
            }
        }

        private async Task RemoveODataPropertiesAsync(HttpResponse response)
        {
            var stream = response.Body;

            stream.Seek(0, SeekOrigin.Begin);

            using var reader = new StreamReader(stream, leaveOpen: true);

            string originalResponse = await reader.ReadToEndAsync();

            var modifiedResponse = originalResponse.Replace("@odata.", string.Empty);

            stream.SetLength(0);

            using var writer = new StreamWriter(stream, leaveOpen: true);

            await writer.WriteAsync(modifiedResponse);
            await writer.FlushAsync();

            response.ContentLength = stream.Length;
        }
    }
}
