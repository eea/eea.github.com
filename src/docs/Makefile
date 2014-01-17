# Makefile for Sphinx documentation
#

SOURCE_DIR		= ../../../../
SPHINX_PATH 	=
PACKAGE_NAME	=
PACKAGE_PATH	= $(SOURCE_DIR)$(PACKAGE_NAME)
SUBPACKAGE_PATH = $(subst .,/,$(PACKAGE_NAME))

# You can set these variables from the command line.
SPHINXOPTS		=
PAPER			=
BUILDDIR      	= ./build
PLONE_BUILDDIR	= $(PACKAGE_PATH)/$(SUBPACKAGE_PATH)/documentation

# Internal variables.
PAPEROPT_a4     = -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) ./

.PHONY: plone-pt

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  plone-pt   to make Plone documentation integrated with the main_template"

clean:
	-rm -rf $(BUILDDIR)
	-rm -rf	$(PLONE_BUILDDIR)/*

plone-pt:
	$(SPHINX_PATH) -ab html $(ALLSPHINXOPTS) $(PLONE_BUILDDIR)
	@echo
	@echo "Build finished. The Page Template pages are in $(PLONE_BUILDDIR)"

