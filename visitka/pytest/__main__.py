import argparse
import os
import sys


def parse_args(argv):
    parser = argparse.ArgumentParser(add_help=False)
    parser.add_argument("targets", nargs="*")
    parser.add_argument("--help", action="store_true")
    parser.add_argument("-h", action="store_true")
    return parser.parse_args(argv)


def main(argv=None):
    args = parse_args(argv or sys.argv[1:])
    if args.help or args.__dict__.get("h"):
        print("Minimal pytest shim: runs Django test runner.")
        print("Usage: pytest [app_label ...]")
        return 0

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ll_project.settings")

    try:
        import django
        from django.conf import settings
        from django.test.utils import get_runner
    except ImportError as exc:
        print("Django is required to run tests.", file=sys.stderr)
        raise SystemExit(1) from exc

    django.setup()

    targets = args.targets or ["learning_logs"]

    TestRunner = get_runner(settings)
    test_runner = TestRunner()
    failures = test_runner.run_tests(targets)
    return failures


if __name__ == "__main__":
    sys.exit(main())
