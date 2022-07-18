## Automattic Update:  -> 

### New Controls:
+   V-100023 - The Red Hat Enterprise Linux operating system must disable the graphical user interface automounter unless required.

### Updated Check/Fixes:
#### Checks:

V-71861:
```
Verify the operating system displays the approved Standard Mandatory DoD Notice and Consent Banner before granting access to the operating system via a graphical user logon.

Note: If the system does not have a Graphical User Interface installed, this requirement is Not Applicable.

Check that the operating system displays the exact approved Standard Mandatory DoD Notice and Consent Banner text with the command:

# grep banner-message-text /etc/dconf/db/local.d/*
banner-message-text=
'You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only. By using this IS (which includes any device attached to this IS), you consent to the following conditions: -The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations. -At any time, the USG may inspect and seize data stored on this IS. -Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose. -This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy. -Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details. '

Note: The " " characters are for formatting only. They will not be displayed on the Graphical User Interface.

If the banner does not match the approved Standard Mandatory DoD Notice and Consent Banner, this is a finding.
```


V-71971:
```
If an HBSS or HIPS is active on the system, this is Not Applicable.

Verify the operating system prevents non-privileged users from executing privileged functions to include disabling, circumventing, or altering implemented security safeguards/countermeasures.

Get a list of authorized users (other than System Administrator and guest accounts) for the system.

Check the list against the system by using the following command:

# semanage login -l | more

Login Name SELinux User MLS/MCS Range Service
__default__ user_u s0-s0:c0.c1023 *
root unconfined_u s0-s0:c0.c1023 *
system_u system_u s0-s0:c0.c1023 *
joe staff_u s0-s0:c0.c1023 *

All administrators must be mapped to the "sysadm_u", "staff_u", or an appropriately tailored confined role as defined by the organization.

All authorized non-administrative users must be mapped to the "user_u" role. 

If they are not mapped in this way, this is a finding.
```


V-71999:
```
Verify the operating system security patches and updates are installed and up to date. Updates are required to be applied with a frequency determined by the site or Program Management Office (PMO). 

Obtain the list of available package security updates from Red Hat. The URL for updates is https://rhn.redhat.com/errata/. It is important to note that updates provided by Red Hat may not be present on the system if the underlying packages are not installed.

Check that the available package security updates have been installed on the system with the following command:

# yum history list | more
Loaded plugins: langpacks, product-id, subscription-manager
ID | Command line | Date and time | Action(s) | Altered
-------------------------------------------------------------------------------
 70 | install aide | 2016-05-05 10:58 | Install | 1 
 69 | update -y | 2016-05-04 14:34 | Update | 18 EE
 68 | install vlc | 2016-04-21 17:12 | Install | 21 
 67 | update -y | 2016-04-21 17:04 | Update | 7 EE
 66 | update -y | 2016-04-15 16:47 | E, I, U | 84 EE

If package updates have not been performed on the system within the timeframe that the site/program documentation requires, this is a finding. 

Typical update frequency may be overridden by Information Assurance Vulnerability Alert (IAVA) notifications from CYBERCOM.

If the operating system is in non-compliance with the Information Assurance Vulnerability Management (IAVM) process, this is a finding.
```


V-72029:
```
Verify the local initialization files of all local interactive users are owned by that user.

Check the home directory assignment for all non-privileged users on the system with the following command:

Note: The example will be for the smithj user, who has a home directory of "/home/smithj".

# cut -d: -f 1,3,6 /etc/passwd | egrep ":[1-4][0-9]{3}"
smithj:1000:/home/smithj

Note: This may miss interactive users that have been assigned a privileged User Identifier (UID). Evidence of interactive use may be obtained from a number of log files containing system logon information.

Check the owner of all local interactive user's initialization files with the following command:

# ls -al /home/smithj/.[^.]* | more

-rwxr-xr-x 1 smithj users 896 Mar 10 2011 .profile
-rwxr-xr-x 1 smithj users 497 Jan 6 2007 .login
-rwxr-xr-x 1 smithj users 886 Jan 6 2007 .something

If all local interactive user's initialization files are not owned by that user or root, this is a finding.
```


V-72081:
```
Confirm the audit configuration regarding how auditing processing failures are handled.

Check to see what level "auditctl" is set to with following command: 

# auditctl -s | grep -i "fail"

failure 2

Note: If the value of "failure" is set to "2", the system is configured to panic (shut down) in the event of an auditing failure. If the value of "failure" is set to "1", the system is configured to only send information to the kernel log regarding the failure.

If the "failure" setting is set to any value other than "1" or "2", this is a finding.

If the "failure" setting is not set, this should be upgraded to a CAT I finding.

If the "failure" setting is set to "1" but the availability concern is not documented or there is no monitoring of the kernel log, this should be downgraded to a CAT III finding.
```


V-72281:
```
Determine whether the system is using local or DNS name resolution with the following command:

# grep hosts /etc/nsswitch.conf
hosts: files dns

If the DNS entry is missing from the host's line in the "/etc/nsswitch.conf" file, the "/etc/resolv.conf" file must be empty.

Verify the "/etc/resolv.conf" file is empty with the following command:

# ls -al /etc/resolv.conf
-rw-r--r-- 1 root root 0 Aug 19 08:31 resolv.conf

If local host authentication is being used and the "/etc/resolv.conf" file is not empty, this is a finding.

If the DNS entry is found on the host's line of the "/etc/nsswitch.conf" file, verify the operating system is configured to use two or more name servers for DNS resolution.

Determine the name servers used by the system with the following command:

# grep nameserver /etc/resolv.conf
nameserver 192.168.1.2
nameserver 192.168.1.3

If less than two lines are returned that are not commented out, this is a finding.

Verify that the "/etc/resolv.conf" file is immutable with the following command:

# sudo lsattr /etc/resolv.conf

----i----------- /etc/resolv.conf

If the file is mutable and has not been documented with the Information System Security Officer (ISSO), this is a finding.
```


V-72417:
```
Verify the operating system has the packages required for multifactor authentication installed.

Check for the presence of the packages required to support multifactor authentication with the following commands:

# yum list installed pam_pkcs11
pam_pkcs11-0.6.2-14.el7.noarch.rpm


If the "pam_pkcs11" package is not installed, this is a finding.
```


V-94843:
```
Note: If the operating system does not have a graphical user interface installed, this requirement is Not Applicable.

Verify the operating system is not configured to reboot the system when Ctrl-Alt-Delete is pressed.

Check that the ctrl-alt-del.target is masked and not active in the graphical user interface with the following command:

# grep logout /etc/dconf/db/local.d/*

logout=''

If "logout" is not set to use two single quotations, or is missing, this is a finding.
```


