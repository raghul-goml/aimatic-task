# Use the AWS Lambda Python 3.11 base image
FROM public.ecr.aws/lambda/python:3.9

# Set working directory
WORKDIR /var/task

# Copy requirements and install to current dir (Lambda expects code+deps at /var/task)
COPY requirements.txt .
RUN pip install --only-binary=:all: -r requirements.txt --target .

# Copy application code
COPY . .
RUN ls -R
# Command to run the Lambda handler (Mangum wraps FastAPI app)
CMD ["app.main.handler"]
# CMD [ "python","app.main.py" ]

