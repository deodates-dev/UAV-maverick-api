import time, os, stat
import logging

general_log = logging.getLogger("tornado.general")


def mkdirs(dirpath):
    if not os.path.exists(dirpath):
        return os.makedirs(dirpath)
    else:
        return True


def file_age_in_seconds(pathname):
    try:
        return time.time() - os.stat(pathname)[stat.ST_MTIME]
    except OSError as e:
        general_log.error(f"Failed to obtain file age {e}")
        return None


def find(key, dictionary):
    """Find all occurences of a key in nested python dictionaries and lists"""
    # https://stackoverflow.com/questions/9807634/find-all-occurrences-of-a-key-in-nested-python-dictionaries-and-lists
    for k, v in dictionary.iteritems():
        if k == key:
            yield v
        elif isinstance(v, dict):
            for result in find(key, v):
                yield result
        elif isinstance(v, list):
            for d in v:
                for result in find(key, d):
                    yield result
