""" Installer
"""
from setuptools import setup, find_packages

NAME = 'eea.github.com'
VERSION = '6.0'

setup(name=NAME,
      version=VERSION,
      description=(
            "Public EEA documentation page found at http://eea.github.com"
            ),
      long_description=open("README.md").read(),
      # http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
          "Framework :: Zope2",
          "Framework :: Plone",
          "Framework :: Plone :: 4.0",
          "Framework :: Plone :: 4.1",
          "Framework :: Plone :: 4.2",
          "Framework :: Plone :: 4.3",
          "Programming Language :: Zope",
          "Programming Language :: Python",
          "Programming Language :: Python :: 2.7",
          "Topic :: Software Development :: Libraries :: Python Modules",
          "License :: OSI Approved :: GNU General Public License (GPL)",
      ],
      keywords=('EEA github documentation'),
      author='European Environment Agency: IDM2 A-Team',
      author_email="eea-edw-a-team-alerts@googlegroups.com",
      url='https://github.com/eea/eea.github.com',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['eea', 'eea.github'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          "Sphinx",
          'Docutils',
          'Pygments',
          'collective.sphinx.includedoc',
          'collective.sphinx.autoatschema',
          # -*- Extra requirements: -*-
      ],
      extras_require={
      },
      entry_points="""
      # -*- Entry points: -*-
      """,
      )
