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
      # Get more strings from
      # http://pypi.python.org/pypi?:action=list_classifiers
      classifiers=[
        "Programming Language :: Python",
        ],
      keywords=('eea github documentation'),
      author='European Environment Agency',
      author_email="webadmin@eea.europa.eu",
      url='http://eea.github.com',
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
