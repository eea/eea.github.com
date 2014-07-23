=======================
How to update this page
=======================

This page is created using Sphinx. In order to update it I would advise you
to head to http://sphinx.pocoo.org and get familiar with Sphinx and
reStructeredText.

1. Update your zc.buildout .cfg file
====================================
Add the following config to your zc.buildout .cfg file (see
`hudson.cfg`_ for a more updated version of this snippet)

.. code-block:: console

    parts +=
      eeadocs

    [eeadocs]
    recipe = zc.recipe.egg
    eggs =
      eea.github.com
      Sphinx

    [sources]
    eea.github.com = git https://github.com/eea/eea.github.com.git

    [versions]
    Sphinx = 1.2.2
    docutils = 0.12


2. Run buildout
===============

.. code-block:: console

    $ cd /path/to/www.eea.europa.eu
    $ bin/develop rb

This will install all needed. Now its time for you to edit ``.rst`` files.

.. code-block:: console

    $ cd /path/to/www.eea.europa.eu/src/eea.github.com/src
    $ vim index.rst
    $ vim docs/.../index.rst


3. Generate html
================

After editing ``.rst`` files you need to "compile" html.

**IMPORTANT**
Make sure site looks nice when rendered. It will be compiled in root of
package.

.. code-block:: console

    $ cd /path/to/www.eea.europa.eu/src/eea.github.com
    $ ./build

4. Commit changes
=================

For nice history please commit changes to ``.rst`` files separately then
changes to compiled site.

.. code-block:: console

    $ cd /path/to/www.eea.europa.eu/src/eea.github.com
    $ git commit -a -m "Some very important changes"

5. Don't forget to push
=======================

.. code-block:: console

    $ git push origin master


And that's all folks...

.. _`hudson.cfg`: https://svn.eionet.europa.eu/repositories/Zope/trunk/www.eea.europa.eu/trunk/hudson.cfg
