from setuptools import find_packages
from setuptools import setup

setup(
    name="netlify-subdomains-manager",
    version="0.1.0 ",
    description="",
    long_description=open("README.rst").read(),
    long_description_content_type="text/x-rst",
    author="Haseeb Majid",
    author_email="hello@haseebmajid.dev",
    keywords="cli,netlify",
    license="Apache License",
    url="git@gitlab.com:hmajid2301/netlify-subdomains-manager.git",
    python_requires="~=3.7",
    package_dir={"": "src"},
    packages=find_packages(where="src"),
    zip_safe=False,
    include_package_data=True,
    install_requires=["click>=7.0"],
    entry_points={"console_scripts": ["netlify_subdomains_manager = netlify_subdomains_manager.cli:cli"]},
    classifiers=[
        "Programming Language :: Python",
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
)
