ARG BUILD_FROM
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install porcupine
WORKDIR /usr/src
#ENV WYOMING_PORCUPINE_VERSION=c63f7fe98a5e3296a706399889f65c5a0f88f231
ENV PIP_BREAK_SYSTEM_PACKAGES=1

RUN \
    apt-get update \
    && apt-get install -y --no-install-recommends \
        netcat-traditional \
        python3 \
        git \
        python3-pip \
        python3-venv \
    \
    && python3 -m venv .venv \
    && .venv/bin/pip3 install --no-cache-dir -U \
        setuptools \
        wheel \
    && .venv/bin/pip3 install --no-cache-dir \
        --extra-index-url https://www.piwheels.org/simple \
        "wyoming-porcupine@git+https://github.com/Al3XKOoL/wyoming-porcupine@master" \
    \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/Al3XKOoL/porcupine.git && cd ./porcupine/binding/python && ../../../.venv/bin/python3 setup.py install

WORKDIR /
COPY rootfs /

HEALTHCHECK --start-period=10m \
    CMD echo '{ "type": "describe" }' \
        | nc -w 1 localhost 10400 \
        | grep -iq "porcupine" \
        || exit 1
