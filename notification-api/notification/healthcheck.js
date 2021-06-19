async function healthcheck(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Kvo Notification Service is OK' }),
  };
}

export const handler = healthcheck;
