__version__ = '0.7.0'
from setuptools import setup, find_packages

# README read-in
from os import path
this_directory = path.abspath(path.dirname(__file__))
with open(path.join(this_directory, 'README.rst'), encoding='utf-8') as f:
    long_description = f.read()
# END README read-in

setup(
    name='riptide-plugin-import',
    version=__version__,
    packages=find_packages(),
    description='Tool to manage development environments for web applications using containers - Import Plugin',
    package_data={'riptide_plugin_import': ['tpl/*']},
    long_description=long_description,
    long_description_content_type='text/x-rst',
    url='https://github.com/theCapypara/riptide-plugin-import/',
    author='Marco "Capypara" Köpcke',
    license='MIT',
    install_requires=[
        'git-credentials >= 1.0.0',
        'giftless-client == 0.1.1',
        'GitPython >= 3.1',
        'configcrunch >= 1.0.0',
        'riptide-lib >= 0.7, < 0.8',
        'riptide-cli >= 0.7, < 0.8',
        'riptide-proxy >= 0.7.1, < 0.8',
        'Click >= 7.0',
        'tqdm >= 4.62',
        'requests >= 2.26'
    ],
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Programming Language :: Python',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
    ],
    entry_points='''
        [riptide.plugin]
        import=riptide_plugin_import.plugin:ImportPlugin
    ''',
)
