using Amazon;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;

namespace API.Data
{
    public interface IContactFormEmailSender
    {
        Task<bool> SendContactFormEmail(ContactFormDto formData);
    }
    public class SesContactFormEmailSender : IContactFormEmailSender
{
    private readonly IAmazonSimpleEmailService _sesClient;
    private readonly string _fromEmail;
    private readonly string _toEmail;

    public SesContactFormEmailSender(string awsAccessKeyId, string awsSecretAccessKey, string region, string fromEmail, string toEmail)
    {
        _sesClient = new AmazonSimpleEmailServiceClient(awsAccessKeyId, awsSecretAccessKey, RegionEndpoint.GetBySystemName(region));
        _fromEmail = fromEmail;
        _toEmail = toEmail;
    }

    public async Task<bool> SendContactFormEmail(ContactFormDto formData)
    {
        var sendRequest = new SendEmailRequest
        {
            Source = _fromEmail,
            Destination = new Destination
            {
                ToAddresses = new List<string> { _toEmail }
            },
            Message = new Message
            {
                Subject = new Content($"Contact Form: {formData.Subject}"),
                Body = new Body
                {
                    Text = new Content
                    {
                        Charset = "UTF-8",
                        Data = $"Name: {formData.Name}\nEmail: {formData.Email}\nSubject: {formData.Subject}\n\nMessage:\n{formData.Message}"
                    }
                }
            }
        };

        try
        {
            await _sesClient.SendEmailAsync(sendRequest);
            return true;
        }
        catch
        {
            return false;
        }
    }
    }
}