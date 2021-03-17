FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

# Open port
EXPOSE 80

# Setup work directory
WORKDIR /app
COPY ./app /app

RUN pip install requests
RUN pip install pandas
RUN pip install openpyxl
# Install dependencies
COPY ./app/requirements.txt /requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /requirements.txt