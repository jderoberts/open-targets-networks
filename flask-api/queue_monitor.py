import pyinotify

wm = pyinotify.WatchManager()

mask = pyinotify.IN_MODIFY

class EventHandler(pyinotify.ProcessEvent):
	def process_IN_MODIFY(self, event):
		print ("Detected file modification!")

handler = EventHandler()
notifier = pyinotify.Notifier(wm, handler, timeout=10)
wdd = wm.add_watch('/home/jr553/flask-api/queue.txt', mask, rec=True)

notifier.loop()
