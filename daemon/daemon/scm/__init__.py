from abc import ABCMeta, abstractmethod
from os import chdir, getcwd
from os.path import dirname, relpath

from daemon.utils import cached_property


class SCMBase(object):
    __metaclass__ = ABCMeta

    def __init__(self, file_path, repo_path):
        self.__file_path = file_path
        self.__repo_path = repo_path

        original_path = getcwd()
        chdir(dirname(self.__file_path))

        self.name = self._get_name()
        self.email = self._get_email()
        self.branch = self._get_branch()
        self.commit = self._get_commit()
        self.original_file = self._get_original_file()

        chdir(original_path)

        if self.email == "":
            raise Exception('Snapshot not sent: No email has been provided')

    @cached_property
    def relative_file_path(self):
        """ Returns the filepath relative to the repository """
        return relpath(self.__file_path, self.__repo_path)

    @abstractmethod
    def _get_name(self):
        """ Gets the name associated with the SCM """
        return

    @abstractmethod
    def _get_email(self):
        """ Gets the email associated with the SCM """
        return

    @abstractmethod
    def _get_branch(self):
        """ Gets the current branch of the SCM """
        return

    @abstractmethod
    def _get_commit(self):
        """
        Retrieve commit id of the most recent commit pushed to remote from
        the current directory.
        """
        return

    @abstractmethod
    def _get_original_file(self):
        """
        Returns the path to a temporary file containing the contents of the
        specified file at the base commit. The same path should be returned
        every time.
        """
        return
