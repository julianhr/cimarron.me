Classic method of creating an infinite scroll. Keep track of the container's scroll location. Attach a `scroll` listener to the container or the window, depending on the application.

When the container is within 500px of reaching the bottom a fetch request is sent for new records.
