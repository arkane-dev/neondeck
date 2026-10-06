#!/usr/bin/env python3
# Snapshot a page in WebKitGTK 4.1, the engine Wails uses on Linux. Chromium hides some WebKit
# layout bugs (a fit-content <dialog> once collapsed to 2px here and looked fine in Chromium).
#
#   WEBKIT_DISABLE_DMABUF_RENDERER=1 python3 scripts/wkgtk-snap.py <url> <out.png> [js-step ...]
#
# Runs offscreen (nothing appears on screen). Each JS step runs 500ms after the last; non-empty
# results print. At the end it prints the open <dialog> size, if any, and saves the PNG.
# Needs python-gobject and webkit2gtk-4.1 (Wails needs the latter anyway).
import sys, gi
gi.require_version('Gtk', '3.0'); gi.require_version('WebKit2', '4.1')
from gi.repository import Gtk, WebKit2, GLib
url, out, steps = sys.argv[1], sys.argv[2], sys.argv[3:]
MEASURE = """(() => { const d = document.querySelector('dialog[open]'); if (!d) return 'no open dialog';
  const r = d.getBoundingClientRect(), i = d.querySelector('.inner').getBoundingClientRect();
  return `dialog ${Math.round(r.width)}x${Math.round(r.height)} · inner ${Math.round(i.width)}x${Math.round(i.height)}`; })()"""
win = Gtk.OffscreenWindow(); win.set_default_size(1280, 800)
view = WebKit2.WebView(); win.add(view); win.show_all()
def js(code, then):
    def done(v, res):
        try:
            r = v.evaluate_javascript_finish(res)
            then(r.to_string() if r and not r.is_undefined() else None)
        except Exception as e:
            print('JS ERROR', e); then(None)
    view.evaluate_javascript(code, -1, None, None, None, done)
def snap():
    def got(v, res):
        v.get_snapshot_finish(res).write_to_png(out); Gtk.main_quit()
    view.get_snapshot(WebKit2.SnapshotRegion.VISIBLE, WebKit2.SnapshotOptions.NONE, None, got)
def run(i=0):
    if i < len(steps):
        js(steps[i], lambda r: (r is not None and print('step', i, '=>', r), GLib.timeout_add(500, lambda: (run(i + 1), False)[1]))[1])
    else:
        js(MEASURE, lambda r: (print(r), snap()))
started = []
def loaded(v, ev):
    # Hash-router navigations fire FINISHED again; only start once.
    if ev == WebKit2.LoadEvent.FINISHED and not started:
        started.append(1); GLib.timeout_add(1500, lambda: (run(), False)[1])
view.connect('load-changed', loaded)
GLib.timeout_add(30000, lambda: (print('timeout'), Gtk.main_quit()))
view.load_uri(url); Gtk.main()
