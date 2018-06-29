//Error:1
Invarian violation: view config not found for name RNSVGPath.
Solution:
react-native link react-native-svg
Problem with the linking component , rnpm merged into react-native , so we should link native component.

//Error:2
Undefined PropTypes error.
This error caused because of importing the PropTypes with in Component like,
import {PropTypes, Component} from 'react';
Solution:
We should import PropTypes seperately,
import PropTypes from 'prop-types';

//Error:3
Error: A non-recoverable condition has triggered. Watchman needs your help! The triggering condition was at timestamp=1489123194: inotify-add-watch(/var/www/html/eventManager/android/app/src/main/res/mipmap-mdpi) -> The user limit on the total number of inotify watches was reached; increase the fs.inotify.max_user_watches sysctl All requests will continue to fail with this message until you resolve the underlying problem. You will find more information on fixing this at
Solution:
echo 256 | sudo tee -a /proc/sys/fs/inotify/max_user_instances
echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_queued_events
echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
watchman shutdown-server
