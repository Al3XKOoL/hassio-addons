# Home Assistant Add-on: porcupine

## Installation

Follow these steps to get the add-on installed on your system:

1. Navigate in your Home Assistant frontend to **Settings** -> **Add-ons** -> **Add-on store**.
2. Add the store https://github.com/chatziko/hassio-addons
2. Find the "porcupine" add-on and click it.
3. Click on the "INSTALL" button.

## Access key and usage restrictions

This add-on uses porcupine v3 which needs an **access key** to function. You need to create it (for free)
from [Picovoice Console](https://console.picovoice.ai/) and insert it in the configuration page before
starting the add-on.

Note also that each access key can be used in **at most three different machines** per month. If you uninstall and re-install
the add-on, it will count as a **new machine**, but restarting or updating the addon does not seem to increase the counter.

If you prefer to use porcupine without an access key and usage restrictions, you can install the
[porcupine1 add-on](https://my.home-assistant.io/redirect/supervisor_addon/?addon=47701997_porcupine1&repository_url=https%3A%2F%2Fgithub.com%2Frhasspy%2Fhassio-addons).
That addon uses porcupine v1 which does not need an access key.

## How to use

After this add-on is installed and running, it will be automatically discovered
by the Wyoming integration in Home Assistant. To finish the setup,
click the following my button:

[![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=wyoming)

Alternatively, you can install the Wyoming integration manually, see the
[Wyoming integration documentation](https://www.home-assistant.io/integrations/wyoming/)
for more information.

## Configuration

### Option: `access_key`

Access key obtained from [Picovoice Console](https://console.picovoice.ai/).

### Option: `sensitivity`

Activation threshold (0-1), where lower means fewer activations.

### Option: `debug_logging`

Enable debug logging. Useful for seeing satellite connections and each wake word detection in the logs.

## Custom wake words

You can train custom wake words from the Picovoice Console (https://console.picovoice.ai/). Select **Create Wake Word** and
enter the language and desired wake word. After clicking on **Train**, make sure you select the correct platform where your Home Assistant
server runs, eg Raspberry Pi or Linux (x86_64). Finally, you will receive a zip file, unzip it to obtain the wake word `.ppn` file.

The add-on will automatically load custom wake words from the `/share/porcupine` directory. [Install the Samba add-on](https://www.home-assistant.io/common-tasks/supervised/#installing-and-using-the-samba-add-on) to copy wake word files (`*.ppn`) to this directory.

After adding new keywords to `/share/porcupine`, make sure to reload any Wyoming integrations for openWakeWord. Once reloaded, the new wake words will be available to select in the Voice Assistants settings page.

## Support

Got questions?

You have several options to get them answered:

- The [Home Assistant Discord Chat Server][discord].
- The Home Assistant [Community Forum][forum].
- Join the [Reddit subreddit][reddit] in [/r/homeassistant][reddit]

In case you've found an bug, please [open an issue on our GitHub][issue].

[discord]: https://discord.gg/c5DvZ4e
[forum]: https://community.home-assistant.io
[issue]: https://github.com/home-assistant/addons/issues
[reddit]: https://reddit.com/r/homeassistant
[repository]: https://github.com/hassio-addons/repository
