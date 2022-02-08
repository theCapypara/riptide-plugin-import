|Riptide|
=========

.. |Riptide| image:: https://riptide-docs.readthedocs.io/en/latest/_images/logo.png
    :alt: Riptide

.. class:: center

    ======================  ===================  ===================  ===================
    *Main packages:*        lib_                 proxy_               cli_
    *Container-Backends:*   engine_docker_
    *Database Drivers:*     db_mysql_            db_mongo_
    *Plugins:*              php_xdebug_          **import**
    *Kubernetes:*           k8s_client_          k8s_controller_
    *Related Projects:*     configcrunch_
    *More:*                 docs_                repo_                docker_images_
    ======================  ===================  ===================  ===================

.. _lib:            https://github.com/theCapypara/riptide-lib
.. _cli:            https://github.com/theCapypara/riptide-cli
.. _proxy:          https://github.com/theCapypara/riptide-proxy
.. _configcrunch:   https://github.com/theCapypara/configcrunch
.. _engine_docker:  https://github.com/theCapypara/riptide-engine-docker
.. _db_mysql:       https://github.com/theCapypara/riptide-db-mysql
.. _db_mongo:       https://github.com/theCapypara/riptide-db-mongo
.. _docs:           https://github.com/theCapypara/riptide-docs
.. _repo:           https://github.com/theCapypara/riptide-repo
.. _docker_images:  https://github.com/theCapypara/riptide-docker-images
.. _php_xdebug:     https://github.com/theCapypara/riptide-plugin-php-xdebug
.. _import:         https://github.com/theCapypara/riptide-plugin-import
.. _k8s_client:     https://github.com/theCapypara/riptide-k8s-client
.. _k8s_controller: https://github.com/theCapypara/riptide-k8s-controller

|build| |docs| |pypi-version| |pypi-downloads| |pypi-license| |pypi-pyversions| |slack|

.. |build| image:: https://img.shields.io/github/workflow/status/theCapypara/riptide-plugin-import/Build,%20test%20and%20publish
    :target: https://github.com/theCapypara/riptide-plugin-import/actions
    :alt: Build Status

.. |docs| image:: https://readthedocs.org/projects/riptide-docs/badge/?version=latest
    :target: https://riptide-docs.readthedocs.io/en/latest/?badge=latest
    :alt: Documentation Status

.. |slack| image:: https://slack.riptide.theCapypara.de/badge.svg
    :target: https://slack.riptide.theCapypara.de
    :alt: Join our Slack workspace

.. |pypi-version| image:: https://img.shields.io/pypi/v/riptide-plugin-import
    :target: https://pypi.org/project/riptide-plugin-import/
    :alt: Version

.. |pypi-downloads| image:: https://img.shields.io/pypi/dm/riptide-plugin-import
    :target: https://pypi.org/project/riptide-plugin-import/
    :alt: Downloads

.. |pypi-license| image:: https://img.shields.io/pypi/l/riptide-plugin-import
    :alt: License (MIT)

.. |pypi-pyversions| image:: https://img.shields.io/pypi/pyversions/riptide-plugin-import
    :alt: Supported Python versions

Riptide is a set of tools to manage development environments for web applications.
It's using container virtualization tools, such as `Docker <https://www.docker.com/>`_
to run all services needed for a project.

It's goal is to be easy to use by developers.
Riptide abstracts the virtualization in such a way that the environment behaves exactly
as if you were running it natively, without the need to install any other requirements
the project may have.

Plugin: Import
--------------

This plugin extends Riptide with improved assistance for project setup and importing data (assets & databases) when
setting up repository.
The plugin requires files to be imported to be present in the same repository. Git LFS is supported.

The plugin uses it's own configuration file ``import.riptide.yml`` to be placed next to the ordinary ``riptide.yml``
project configuration files. See the documentation for more info.

The plugin replaces two Riptide CLI commands:

.. code::

   riptide import-db --help  # new flag --from-repo; also replaces and the alias db-import command.
   riptide import-files --help  # new flag --from-repo

Other than that, the plugin replaces the ``riptide setup`` command with an interactive web
project web setup. The original command can be accessed via the hidden command ``riptide setup-legacy``.
The improved web setup is also available for projects that don't have the ``ìmport.riptide.yml`` configuration file.

Documentation
-------------

The complete documentation for Riptide (including this plugin) can be found at `Read the Docs <https://riptide-docs.readthedocs.io/en/latest/>`_.