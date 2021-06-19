import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'ap-southeast-2' });

// This lambda function will message from SQS and send email via SES (simple email service)
async function sendMail(event, context) {
    const record =  event.Records[0]; // it has only 1 record because sqs has 1 record set in serveless.yml
    console.log('record processing', record);

    const email = JSON.parse(record.body);
    const { subject, body, recipient } = email;

    const params = {
        Source: 'kvo.auction.sit@gmail.com',
        Destination: {
            ToAddresses: [recipient],
        },
        Message: {
            Body: {
                Text: {
                    Data: body,
                },
            },
            Subject: {
                Data: subject,
            },
        },
    };

    try {
        const result = await ses.sendEmail(params).promise();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const handler = sendMail;


