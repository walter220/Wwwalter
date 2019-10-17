# Pi dashboard

Dit project is meer bedoelt als test opzet voor de rapsberry pi icm jenkins build server automatisering.

## Eigenschappen

Node: `v10.16.3`

## Productie

`npm run build`

## Development

`npm start`

## Testing

`npm test`

# Deployment logboek

En als ik er echt niet meer uitkom, zie dan hier:
https://jee-appy.blogspot.com/2017/01/deply-django-with-nginx.html

## Project bestanden en configuratie

Project deployment configuratie bestanden aan de git toegevoegd. Variabele zijn:

-   `PROJNAME` is de naam van het project
-   `ENV` is `tst` of `prd`

Heb ik staan in een mapje op root level `deploy/ENV/`

> **gunicorn_PROJNAME_ENV.bash**

```conf
#!/bin/bash

NAME="PROJNAME"
PROJECTDIR=/var/www/PROJNAME_ENV
SOCKFILE=/var/www/PROJNAME_ENV/run/gunicorn.sock
USER=www-data
GROUP=www-data
NUM_WORKERS=3
DJANGO_SETTINGS_MODULE=PROJNAME.settings.ENV
DJANGO_WSGI_MODULE=PROJNAME.wsgi
echo "Starting $NAME as `whoami`"


# Activate the virtual environment

cd $PROJECTDIR
source /var/www/PROJNAME/bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$PROJECTDIR:$PYTHONPATH


# Create the run directory if it doens't exist

RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR


# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)

exec gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user=$USER --group=$GROUP \
  --bind=unix:$SOCKFILE \
  --log-level=debug \
  --log-file=-
```

---

> **nginx_PROJNAME_ENV.conf**

```conf
# Nginx configuration test env

upstream PROJNAME_ENV {
    server unix:/var/www/PROJNAME_ENV/run/gunicorn.sock fail_timeout=0;
}

# Use this when SSL is ready
# Redirect to SSL/HTTPS
# server {
#     listen 80;
#     server_name obk.tst.wwwalter.nl;
#     return 301 https://$server_name$request_uri;
# }

server {
    # Switch when SSL is ready
    listen 80;
    # listen 443 ssl;
    # Remove IP-Adres when SSL is ready
    server_name 192.168.0.137 obk.tst.wwwalter.nl;

    charset utf-8;

    # Max upload size of 100 mb
    client_max_body_size 100m;
    access_log /var/www/PROJNAME_ENV/logs/nginx-access.log;
    error_log /var/www/PROJNAME_ENV/logs/nginx-error.log;

    # Authentication
    auth_basic "Afgeschermde omgeving";
    auth_basic_user_file /etc/apache2/.htpasswd;

    # SSL Certificaat dingen komen hieronder
    # ssl_certificate /etc/letsencrypt/live/obk.tst.wwwalter.nl/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/obk.tst.wwwalter.nl/privkey.pem;

    location /static/ {
        alias /var/www/PROJNAME_ENV/static/;
    }

    location /media/ {
        alias /var/www/PROJNAME_ENV/media/;
    }

    location / {
        # an HTTP header important enough to have its own Wikipedia entry:
        #   http://en.wikipedia.org/wiki/X-Forwarded-For
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # enable this if and only if you use HTTPS, this helps Rack
        # set the proper protocol for doing redirects:
        # proxy_set_header X-Forwarded-Proto https;

        # pass the Host: header from the client right along so redirects
        # can be set properly within the Rack application
        proxy_set_header Host $http_host;

        # we don't want nginx trying to do something clever with
        # redirects, we set the Host: header above already.
        proxy_redirect off;

        # Try to serve static files from nginx, no point in making an
        # *application* server like Unicorn/Rainbows! serve static files.
        if (!-f $request_filename) {
            proxy_pass http://PROJNAME_ENV;
            break;
        }
    }

    # Error pages
    error_page 500 502 503 504 /500.html;
    location = /500.html {
        root /var/www/PROJNAME_ENV/static/;
    }
}
```

> **supervisor_PROJNAME_ENV.conf**

```conf
[program:PROJNAME_ENV]
command = /var/www/PROJNAME_ENV/deploy/prd/gunicorn_PROJNAME_ENV.bash;
user = www-data;
stdout_logfile = /var/www/PROJNAME_ENV/log/supervisor.log;
redirect_stderr = true;
environment=LANG=en_US.UTF-8,LC_ALL=en_US.UTF-8;
```

In de settings folder van Django project komen volgende bestanden:

-   base.py
-   dev.py
-   tst.py
-   prd.py

Deze bestanden bevatten de juiste configuratie voor de server.

-   `SECRET_KEY`: Voor iedere env heb ik een aparte key gegenereerd
-   `ALLOWED_HOSTS`: Voor dev mag `['*']`. Voor tst en prd wel aanvullen met de juiste
-   `DATABASES`: Voor dev wordt in de base de default `SQLite3` Database gebruikt. In `tst` en `prd` postgres configuratie gebruiken.
-   `LOGGING`: Kan altijd makkelijk zijn om fouten op te sporen. te gebruiken in `tst` en `prd`

> settings.py database settings

```conf
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '', # Mag leeg blijven
    }
}
```

> settings.py logging settings

```conf
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt' : "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'logs/django.log',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django': {
            'handlers':['file'],
            'propagate': True,
            'level':'DEBUG',
        },
        'MYAPP': {
            'handlers': ['file'],
            'level': 'DEBUG',
        },
    }
}
```

---

## Database aanmaken

Dubbel check of postgres is geinstalleerd:

`$ sudo apt-get install postgresql postgresql-contrib`

Dan een user aanmaken

`$ sudo su - postgres` (ga verder als postgres user)

`$ createuser --interactive -P`

Start een interactive shell om database user aan te maken. De rest van de instellingen kan gekozen worden voor `No`.

`$ createdb --owner db_user db_name` (db_user en db_name vervangen)

`$ logout` (om weer als normale gebruiker verder te gaan)

---

## Connectie met de Database maken

Als je in de virtualenv zit van je project

Voor de pip package moeten de volgende dependencies geinstalleerd zijn.

`$ sudo apt-get install libpq-dev python3-dev`

Voor DB connectie

`(env) $ pip install psycopg2`

---

## Gunicorn voorbereiden

`(env) $ pip install gunicorn`

Het script in de `deploy/ENV` mappen moeten wel uitvoerbaar zijn. Daarvoor kan dit gebruikt worden:

`$ sudo chmod u+x gunicorn_start.bash`

---

## Supervisor voorbereiden

Zorg dat supervisor geinstalleerd is

`$ sudo apt-get install supervisor`

Het supervisor bestand moet staan in `/etc/supervisor/conf.d/`. Misschien lukt het met een symlink. Anders ga ik die kopieëren.

`$ sudo ln -s /var/www/PROJNAME_ENV/deploy/ENV/supervisor_PROJNAME_ENV.conf /etc/supervisor/conf.d/`

Via symlink kan, maar dan moet de folder wel bestaan en op een bereikbare plek staan.

---

Als dat bestand goed overkomt, gebruik:

(of dit is nodig)

`$ sudo supervisorctl reread`

`$ sudo supervisorctl update`

(of dit is nodig)

`$ sudo systemctl restart supervisor`

`$ sudo systemctl enable supervisor`

---

Als dat allemaal OK berichten geeft, dan doen we:

`$ sudo supervisorctl start PROJNAME_ENV`

Status checken: (zelfde voor start | stop | restart )

`$ sudo supervisorctl status PROJNAME_ENV`

---

## Nginx instellen

Kijken of ik de site via symlink beschikbaar kan maken

`$ sudo ln -s /var/www/PROJNAME_ENV/deploy/ENV/nginx_PROJNAME_ENV.conf /etc/nginx/sites-enabled/nginx_PROJNAME_ENV.conf`

Als laatste nog ff nginx restarten en done (hopelijk)

`$ sudo service nginx start`
