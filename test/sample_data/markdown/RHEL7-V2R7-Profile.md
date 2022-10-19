## Automatic Update:  -> 

### New Controls:
+   V-100023 - The Red Hat Enterprise Linux operating system must disable the graphical user interface automounter unless required.


### Updated Check/Fixes:
#### Checks:
<details open>
  <summary>Click to expand.</summary>
V-71861:
Old: 
```
Verify the operating system displays the approved Standard Mandatory DoD
Notice and Consent Banner before granting access to the operating system via a
graphical user logon.
    Note: If the system does not have GNOME installed, this requirement is Not
Applicable.
    Check that the operating system displays the exact approved Standard
Mandatory DoD Notice and Consent Banner text with the command:
    # grep banner-message-text /etc/dconf/db/local.d/*
    banner-message-text=
    'You are accessing a U.S. Government (USG) Information System (IS) that is
provided for USG-authorized use only.    By using this IS (which includes any device attached to this IS), you
consent to the following conditions:    -The USG routinely intercepts and monitors communications on this IS for
purposes including, but not limited to, penetration testing, COMSEC monitoring,
network operations and defense, personnel misconduct (PM), law enforcement
(LE), and counterintelligence (CI) investigations.    -At any time, the USG may inspect and seize data stored on this IS.    -Communications using, or data stored on, this IS are not private, are
subject to routine monitoring, interception, and search, and may be disclosed
or used for any USG-authorized purpose.    -This IS includes security measures (e.g., authentication and access
controls) to protect USG interests--not for your personal benefit or privacy.    -Notwithstanding the above, using this IS does not constitute consent to
PM, LE or CI investigative searching or monitoring of the content of privileged
communications, or work product, related to personal representation or services
by attorneys, psychotherapists, or clergy, and their assistants. Such
communications and work product are private and confidential. See User
Agreement for details. '
    Note: The "     " characters are for formatting only. They will not be displayed on the
GUI.
    If the banner does not match the approved Standard Mandatory DoD Notice and
Consent Banner, this is a finding.

```

Updated:
```
Verify the operating system displays the approved Standard Mandatory DoD Notice and Consent Banner before granting access to the operating system via a graphical user logon.

Note: If the system does not have a Graphical User Interface installed, this requirement is Not Applicable.

Check that the operating system displays the exact approved Standard Mandatory DoD Notice and Consent Banner text with the command:

# grep banner-message-text /etc/dconf/db/local.d/*
banner-message-text=
'You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.\nBy using this IS (which includes any device attached to this IS), you consent to the following conditions:\n-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.\n-At any time, the USG may inspect and seize data stored on this IS.\n-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.\n-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.\n-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details. '

Note: The "\n " characters are for formatting only. They will not be displayed on the Graphical User Interface.

If the banner does not match the approved Standard Mandatory DoD Notice and Consent Banner, this is a finding.

```
---
V-71971:
Old: 
```
If an HBSS or HIPS is active on the system, this is Not Applicable.

    Verify the operating system prevents non-privileged users from executing
privileged functions to include disabling, circumventing, or altering
implemented security safeguards/countermeasures.

    Get a list of authorized users (other than System Administrator and guest
accounts) for the system.

    Check the list against the system by using the following command:

    # semanage login -l | more
    Login Name SELinux User MLS/MCS Range Service
    __default__ user_u s0-s0:c0.c1023 *
    root unconfined_u s0-s0:c0.c1023 *
    system_u system_u s0-s0:c0.c1023 *
    joe staff_u s0-s0:c0.c1023 *

    All administrators must be mapped to the "sysadm_u" or "staff_u" users
role.

    All authorized non-administrative users must be mapped to the "user_u"
role.

    If they are not mapped in this way, this is a finding.

```

Updated:
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
---
V-71999:
Old: 
```
Verify the operating system security patches and updates are installed and
      up to date. Updates are required to be applied with a frequency determined by
      the site or Program Management Office (PMO).

      Obtain the list of available package security updates from Red Hat. The URL
      for updates is https://rhn.redhat.com/errata/. It is important to note that
      updates provided by Red Hat may not be present on the system if the underlying
      packages are not installed.

      Check that the available package security updates have been installed on
      the system with the following command:

          # yum history list | more
          Loaded plugins: langpacks, product-id, subscription-manager
          ID     | Command line             | Date and time    | Action(s)      |
      Altered

      -------------------------------------------------------------------------------
              70 | install aide             | 2016-05-05 10:58 | Install       |
      1
              69 | update -y                | 2016-05-04 14:34 | Update     |   18 EE
              68 | install vlc                | 2016-04-21 17:12 | Install        |
      21
              67 | update -y                | 2016-04-21 17:04 | Update     |     7 EE
              66 | update -y                | 2016-04-15 16:47 | E, I, U         |
      84 EE

          If package updates have not been performed on the system within the
      timeframe that the site/program documentation requires, this is a finding.

    If the operating system is in non-compliance with the Information Assurance
Vulnerability Management (IAVM) process, this is a finding.

```

Updated:
```
Verify the operating system security patches and updates are installed and up to date. Updates are required to be applied with a frequency determined by the site or Program Management Office (PMO). 

Obtain the list of available package security updates from Red Hat. The URL for updates is https://rhn.redhat.com/errata/. It is important to note that updates provided by Red Hat may not be present on the system if the underlying packages are not installed.

Check that the available package security updates have been installed on the system with the following command:

# yum history list | more
Loaded plugins: langpacks, product-id, subscription-manager
ID     | Command line             | Date and time    | Action(s)      | Altered
-------------------------------------------------------------------------------
    70 | install aide             | 2016-05-05 10:58 | Install       |     1   
    69 | update -y                | 2016-05-04 14:34 | Update     |   18 EE
    68 | install vlc                | 2016-04-21 17:12 | Install        |   21   
    67 | update -y                | 2016-04-21 17:04 | Update     |     7 EE
    66 | update -y                | 2016-04-15 16:47 | E, I, U         |   84 EE

If package updates have not been performed on the system within the timeframe that the site/program documentation requires, this is a finding. 

Typical update frequency may be overridden by Information Assurance Vulnerability Alert (IAVA) notifications from CYBERCOM.

If the operating system is in non-compliance with the Information Assurance Vulnerability Management (IAVM) process, this is a finding.

```
---
V-72029:
Old: 
```
Verify the local initialization files of all local interactive users are
group-owned by that user's primary Group Identifier (GID).

    Check the home directory assignment for all non-privileged users on the
system with the following command:

    Note: The example will be for the smithj user, who has a home directory of
"/home/smithj" and a primary group of "users".

    # cut -d: -f 1,4,6 /etc/passwd | egrep ":[1-4][0-9]{3}"
    smithj:1000:/home/smithj

    # grep 1000 /etc/group
    users:x:1000:smithj,jonesj,jacksons

    Note: This may miss interactive users that have been assigned a privileged
User Identifier (UID). Evidence of interactive use may be obtained from a
number of log files containing system logon information.

    Check the group owner of all local interactive user's initialization files
with the following command:

    # ls -al /home/smithj/.[^.]* | more

    -rwxr-xr-x 1 smithj users 896 Mar 10 2011 .profile
    -rwxr-xr-x 1 smithj users 497 Jan 6 2007 .login
    -rwxr-xr-x 1 smithj users 886 Jan 6 2007 .something

    If all local interactive user's initialization files are not group-owned by
that user's primary GID, this is a finding.

```

Updated:
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
---
V-72039:
Old: 
```
Verify that all system device files are correctly labeled to prevent
unauthorized modification.

    List all device files on the system that are incorrectly labeled with the
following commands:

    Note: Device files are normally found under "/dev", but applications may
place device files in other directories and may necessitate a search of the
entire system.

    #find /dev -context *:device_t:* \( -type c -o -type b \) -printf "%p %Z    "

    #find /dev -context *:unlabeled_t:* \( -type c -o -type b \) -printf "%p
%Z    "

    Note: There are device files, such as "/dev/vmci", that are used when the
operating system is a host virtual machine. They will not be owned by a user on
the system and require the "device_t" label to operate. These device files
are not a finding.

    If there is output from either of these commands, other than already noted,
this is a finding.

```

Updated:
```
Verify that all system device files are correctly labeled to prevent unauthorized modification.

List all device files on the system that are incorrectly labeled with the following commands:

Note: Device files are normally found under "/dev", but applications may place device files in other directories and may necessitate a search of the entire system.

#find /dev -context *:device_t:* \( -type c -o -type b \) -printf "%p %Z\n"

#find /dev -context *:unlabeled_t:* \( -type c -o -type b \) -printf "%p %Z\n"

Note: There are device files, such as "/dev/vmci", that are used when the operating system is a host virtual machine. They will not be owned by a user on the system and require the "device_t" label to operate. These device files are not a finding.

If there is output from either of these commands, other than already noted, this is a finding.

```
---
V-72081:
Old: 
```
Confirm the audit configuration regarding how auditing processing failures
are handled.

    Check to see what level "auditctl" is set to with following command:

    # auditctl -s | grep -i "fail"

    failure 2

    If the value of "failure" is set to "2", the system is configured to
panic (shut down) in the event of an auditing failure.

    If the value of "failure" is set to "1", the system is configured to
only send information to the kernel log regarding the failure.

    If the "failure" setting is not set, this is a CAT I finding.

    If the "failure" setting is set to any value other than "1" or "2",
this is a CAT II finding.

    If the "failure" setting is set to "1" but the availability concern is
not documented or there is no monitoring of the kernel log, this is a CAT III
finding.

```

Updated:
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
---
V-72281:
Old: 
```
Determine whether the system is using local or DNS name resolution with the
following command:

    # grep hosts /etc/nsswitch.conf
    hosts:   files dns

    If the DNS entry is missing from the host's line in the
"/etc/nsswitch.conf" file, the "/etc/resolv.conf" file must be empty.

    Verify the "/etc/resolv.conf" file is empty with the following command:

    # ls -al /etc/resolv.conf
    -rw-r--r--  1 root root        0 Aug 19 08:31 resolv.conf

    If local host authentication is being used and the "/etc/resolv.conf"
file is not empty, this is a finding.

    If the DNS entry is found on the host's line of the "/etc/nsswitch.conf"
file, verify the operating system is configured to use two or more name servers
for DNS resolution.

    Determine the name servers used by the system with the following command:

    # grep nameserver /etc/resolv.conf
    nameserver 192.168.1.2
    nameserver 192.168.1.3

    If less than two lines are returned that are not commented out, this is a
finding.

```

Updated:
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
---
V-72417:
Old: 
```
Verify the operating system has the packages required for multifactor
authentication installed.

Check for the presence of the packages required to support multifactor
authentication with the following commands:

# yum list installed esc
esc-1.1.0-26.el7.noarch.rpm

# yum list installed pam_pkcs11
pam_pkcs11-0.6.2-14.el7.noarch.rpm

If the "esc" and "pam_pkcs11" packages are not installed, this is a
finding.

```

Updated:
```
Verify the operating system has the packages required for multifactor authentication installed.

Check for the presence of the packages required to support multifactor authentication with the following commands:

# yum list installed pam_pkcs11
pam_pkcs11-0.6.2-14.el7.noarch.rpm


If the "pam_pkcs11" package is not installed, this is a finding.

```
---
V-94843:
Old: 
```
Verify the operating system is not configured to reboot the system when
Ctrl-Alt-Delete is pressed.

    Check that the ctrl-alt-del.target is masked and not active in the GUI with
the following command:

    # grep logout /etc/dconf/local.d/*

    logout=''

    If "logout" is not set to use two single quotations, or is missing, this
is a finding.

```

Updated:
```
Note: If the operating system does not have a graphical user interface installed, this requirement is Not Applicable.

Verify the operating system is not configured to reboot the system when Ctrl-Alt-Delete is pressed.

Check that the ctrl-alt-del.target is masked and not active in the graphical user interface with the following command:

# grep logout /etc/dconf/db/local.d/*

logout=''

If "logout" is not set to use two single quotations, or is missing, this is a finding.

```
---
</details>

#### Fixes:
<details open>
  <summary>Click to expand.</summary>
V-71861:
Old: 
```
Configure the operating system to display the approved Standard Mandatory
DoD Notice and Consent Banner before granting access to the system.
    Note: If the system does not have GNOME installed, this requirement is Not
Applicable.
    Create a database to contain the system-wide graphical user logon settings
(if it does not already exist) with the following command:
    # touch /etc/dconf/db/local.d/01-banner-message
    Add the following line to the [org/gnome/login-screen] section of the
"/etc/dconf/db/local.d/01-banner-message":
    [org/gnome/login-screen]
    banner-message-enable=true
    banner-message-text='You are accessing a U.S. Government (USG) Information
System (IS) that is provided for USG-authorized use only.    By using this IS (which includes any device attached to this IS), you
consent to the following conditions:    -The USG routinely intercepts and monitors communications on this IS for
purposes including, but not limited to, penetration testing, COMSEC monitoring,
network operations and defense, personnel misconduct (PM), law enforcement
(LE), and counterintelligence (CI) investigations.    -At any time, the USG may inspect and seize data stored on this IS.    -Communications using, or data stored on, this IS are not private, are
subject to routine monitoring, interception, and search, and may be disclosed
or used for any USG-authorized purpose.    -This IS includes security measures (e.g., authentication and access
controls) to protect USG interests--not for your personal benefit or privacy.    -Notwithstanding the above, using this IS does not constitute consent to
PM, LE or CI investigative searching or monitoring of the content of privileged
communications, or work product, related to personal representation or services
by attorneys, psychotherapists, or clergy, and their assistants. Such
communications and work product are private and confidential. See User
Agreement for details. '
    Note: The "     " characters are for formatting only. They will not be displayed on the
GUI.
    Run the following command to update the database:
    # dconf update

```
New:
```
Configure the operating system to display the approved Standard Mandatory DoD Notice and Consent Banner before granting access to the system.

Note: If the system does not have a Graphical User Interface installed, this requirement is Not Applicable.

Create a database to contain the system-wide graphical user logon settings (if it does not already exist) with the following command:

# touch /etc/dconf/db/local.d/01-banner-message

Add the following line to the [org/gnome/login-screen] section of the "/etc/dconf/db/local.d/01-banner-message":

[org/gnome/login-screen]

banner-message-enable=true

banner-message-text='You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.\nBy using this IS (which includes any device attached to this IS), you consent to the following conditions:\n-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.\n-At any time, the USG may inspect and seize data stored on this IS.\n-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.\n-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.\n-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details. '

Note: The "\n " characters are for formatting only. They will not be displayed on the Graphical User Interface.

Run the following command to update the database:
# dconf update

```
---
V-71971:
Old: 
```
Configure the operating system to prevent non-privileged users from
executing privileged functions to include disabling, circumventing, or altering
implemented security safeguards/countermeasures.

    Use the following command to map a new user to the "sysdam_u" role:

    #semanage login -a -s sysadm_u <username>

    Use the following command to map an existing user to the "sysdam_u" role:

    #semanage login -m -s sysadm_u <username>

    Use the following command to map a new user to the "staff_u" role:

    #semanage login -a -s staff_u <username>

    Use the following command to map an existing user to the "staff_u" role:

    #semanage login -m -s staff_u <username>

    Use the following command to map a new user to the "user_u" role:

    # semanage login -a -s user_u <username>

    Use the following command to map an existing user to the "user_u" role:

    # semanage login -m -s user_u <username>

```
New:
```
Configure the operating system to prevent non-privileged users from executing privileged functions to include disabling, circumventing, or altering implemented security safeguards/countermeasures.

Use the following command to map a new user to the "sysadm_u" role: 

#semanage login -a -s sysadm_u <username>

Use the following command to map an existing user to the "sysadm_u" role:

#semanage login -m -s sysadm_u <username>

Use the following command to map a new user to the "staff_u" role:

#semanage login -a -s staff_u <username>

Use the following command to map an existing user to the "staff_u" role:

#semanage login -m -s staff_u <username>

Use the following command to map a new user to the "user_u" role:

# semanage login -a -s user_u <username>

Use the following command to map an existing user to the "user_u" role:

# semanage login -m -s user_u <username>

```
---
V-72417:
Old: 
```
Configure the operating system to implement multifactor authentication by
installing the required packages.

Install the "esc" and "pam_pkcs11" packages on the system with the
following command:

# yum install esc pam_pkcs11

```
New:
```
Configure the operating system to implement multifactor authentication by installing the required packages.

Install the pam_pkcs11 package with the following command:

# yum install pam_pkcs11

```
---
V-94843:
Old: 
```
Configure the system to disable the Ctrl-Alt-Delete sequence for the GUI
with the following command:

    # touch /etc/dconf/db/local.d/00-disable-CAD

    Add the setting to disable the Ctrl-Alt-Delete sequence for GNOME:

    [org/gnome/settings-daemon/plugins/media-keys]
    logout=''

```
New:
```
Configure the system to disable the Ctrl-Alt-Delete sequence for the graphical user interface with the following command:

# touch /etc/dconf/db/local.d/00-disable-CAD 

Add the setting to disable the Ctrl-Alt-Delete sequence for the graphical user interface:

[org/gnome/settings-daemon/plugins/media-keys]
logout=''

```
---
</details>

### Updated Impacts
<details open>
  <summary>Click to expand.</summary>
V-71859:
Old: 0
New: 0.5
---
V-71861:
Old: 0
New: 0.5
---
V-71891:
Old: 0
New: 0.5
---
V-71893:
Old: 0
New: 0.5
---
V-71899:
Old: 0
New: 0.5
---
V-71901:
Old: 0
New: 0.5
---
V-71953:
Old: 0
New: 0.7
---
V-71955:
Old: 0
New: 0.7
---
V-71961:
Old: 0
New: 0.7
---
V-71963:
Old: 0
New: 0.7
---
V-72081:
Old: 0.7
New: 0.5
---
V-72135:
Old: 0
New: 0.5
---
V-72137:
Old: 0
New: 0.5
---
V-72139:
Old: 0
New: 0.5
---
V-72141:
Old: 0
New: 0.5
---
V-72145:
Old: 0
New: 0.5
---
V-72147:
Old: 0
New: 0.5
---
V-72149:
Old: 0
New: 0.5
---
V-72151:
Old: 0
New: 0.5
---
V-72153:
Old: 0
New: 0.5
---
V-72155:
Old: 0
New: 0.5
---
V-72157:
Old: 0
New: 0.5
---
V-72159:
Old: 0
New: 0.5
---
V-72161:
Old: 0
New: 0.5
---
V-72163:
Old: 0
New: 0.5
---
V-72165:
Old: 0
New: 0.5
---
V-72167:
Old: 0
New: 0.5
---
V-72173:
Old: 0
New: 0.5
---
V-72175:
Old: 0
New: 0.5
---
V-72177:
Old: 0
New: 0.5
---
V-72179:
Old: 0
New: 0.5
---
V-72183:
Old: 0
New: 0.5
---
V-72185:
Old: 0
New: 0.5
---
V-72191:
Old: 0
New: 0.5
---
V-72197:
Old: 0
New: 0.5
---
V-72227:
Old: 0
New: 0.5
---
V-72229:
Old: 0
New: 0.5
---
V-72231:
Old: 0
New: 0.5
---
V-72305:
Old: 0
New: 0.5
---
V-72313:
Old: 0
New: 0.7
---
V-72317:
Old: 0
New: 0.5
---
V-72427:
Old: 0
New: 0.5
---
V-73155:
Old: 0
New: 0.5
---
V-73157:
Old: 0
New: 0.5
---
V-73165:
Old: 0
New: 0.5
---
V-73167:
Old: 0
New: 0.5
---
V-73171:
Old: 0
New: 0.5
---
V-73173:
Old: 0
New: 0.5
---
V-77819:
Old: 0
New: 0.5
---
V-78995:
Old: 0
New: 0.5
---
V-78997:
Old: 0
New: 0.5
---
V-81007:
Old: 0
New: 0.7
---
V-94843:
Old: 0
New: 0.7
---
</details>

### Updated Titles
<details>
  <summary>Click to expand.</summary>
V-71849:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the file permissions, ownership, and group membership of system files and
commands match the vendor values.
New: The Red Hat Enterprise Linux operating system must be configured so that the file permissions, ownership, and group membership of system files and commands match the vendor values.
---
V-71855:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the cryptographic hash of system files and commands matches vendor values.
New: The Red Hat Enterprise Linux operating system must be configured so that the cryptographic hash of system files and commands matches vendor values.
---
V-71859:
Old: The Red Hat Enterprise Linux operating system must display the
Standard Mandatory DoD Notice and Consent Banner before granting local or
remote access to the system via a graphical user logon.
New: The Red Hat Enterprise Linux operating system must display the Standard Mandatory DoD Notice and Consent Banner before granting local or remote access to the system via a graphical user logon.
---
V-71861:
Old: The Red Hat Enterprise Linux operating system must display the
approved Standard Mandatory DoD Notice and Consent Banner before granting local
or remote access to the system via a graphical user logon.
New: The Red Hat Enterprise Linux operating system must display the approved Standard Mandatory DoD Notice and Consent Banner before granting local or remote access to the system via a graphical user logon.
---
V-71863:
Old: The Red Hat Enterprise Linux operating system must display the
Standard Mandatory DoD Notice and Consent Banner before granting local or
remote access to the system via a command line user logon.
New: The Red Hat Enterprise Linux operating system must display the Standard Mandatory DoD Notice and Consent Banner before granting local or remote access to the system via a command line user logon.
---
V-71891:
Old: The Red Hat Enterprise Linux operating system must enable a user
session lock until that user re-establishes access using established
identification and authentication procedures.
New: The Red Hat Enterprise Linux operating system must enable a user session lock until that user re-establishes access using established identification and authentication procedures.
---
V-71893:
Old: The Red Hat Enterprise Linux operating system must initiate a
screensaver after a 15-minute period of inactivity for graphical user
interfaces.
New: The Red Hat Enterprise Linux operating system must initiate a screensaver after a 15-minute period of inactivity for graphical user interfaces.
---
V-71897:
Old: The Red Hat Enterprise Linux operating system must have the screen
package installed.
New: The Red Hat Enterprise Linux operating system must have the screen package installed.
---
V-71899:
Old: The Red Hat Enterprise Linux operating system must initiate a session
lock for the screensaver after a period of inactivity for graphical user
interfaces.
New: The Red Hat Enterprise Linux operating system must initiate a session lock for the screensaver after a period of inactivity for graphical user interfaces.
---
V-71901:
Old: The Red Hat Enterprise Linux operating system must initiate a session
lock for graphical user interfaces when the screensaver is activated.
New: The Red Hat Enterprise Linux operating system must initiate a session lock for graphical user interfaces when the screensaver is activated.
---
V-71903:
Old: The Red Hat Enterprise Linux operating system must be configured so
that when passwords are changed or new passwords are established, the new
password must contain at least one upper-case character.
New: The Red Hat Enterprise Linux operating system must be configured so that when passwords are changed or new passwords are established, the new password must contain at least one upper-case character.
---
V-71905:
Old: The Red Hat Enterprise Linux operating system must be configured so
that when passwords are changed or new passwords are established, the new
password must contain at least one lower-case character.
New: The Red Hat Enterprise Linux operating system must be configured so that when passwords are changed or new passwords are established, the new password must contain at least one lower-case character.
---
V-71907:
Old: The Red Hat Enterprise Linux operating system must be configured so
that when passwords are changed or new passwords are assigned, the new password
must contain at least one numeric character.
New: The Red Hat Enterprise Linux operating system must be configured so that when passwords are changed or new passwords are assigned, the new password must contain at least one numeric character.
---
V-71909:
Old: The Red Hat Enterprise Linux operating system must be configured so
that when passwords are changed or new passwords are established, the new
password must contain at least one special character.
New: The Red Hat Enterprise Linux operating system must be configured so that when passwords are changed or new passwords are established, the new password must contain at least one special character.
---
V-71911:
Old: The Red Hat Enterprise Linux operating system must be configured so
that when passwords are changed a minimum of eight of the total number of
characters must be changed.
New: The Red Hat Enterprise Linux operating system must be configured so that when passwords are changed a minimum of eight of the total number of characters must be changed.
---
V-71913:
Old: The Red Hat Enterprise Linux operating system must be configured so
that when passwords are changed a minimum of four character classes must be
changed.
New: The Red Hat Enterprise Linux operating system must be configured so that when passwords are changed a minimum of four character classes must be changed.
---
V-71915:
Old: The Red Hat Enterprise Linux operating system must be configured so
that when passwords are changed the number of repeating consecutive characters
must not be more than three characters.
New: The Red Hat Enterprise Linux operating system must be configured so that when passwords are changed the number of repeating consecutive characters must not be more than three characters.
---
V-71917:
Old: The Red Hat Enterprise Linux operating system must be configured so
that when passwords are changed the number of repeating characters of the same
character class must not be more than four characters.
New: The Red Hat Enterprise Linux operating system must be configured so that when passwords are changed the number of repeating characters of the same character class must not be more than four characters.
---
V-71919:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the PAM system service is configured to store only encrypted
representations of passwords.
New: The Red Hat Enterprise Linux operating system must be configured so that the PAM system service is configured to store only encrypted representations of passwords.
---
V-71921:
Old: The Red Hat Enterprise Linux operating system must be configured to
use the shadow file to store only encrypted representations of passwords.
New: The Red Hat Enterprise Linux operating system must be configured to use the shadow file to store only encrypted representations of passwords.
---
V-71923:
Old: The Red Hat Enterprise Linux operating system must be configured so
that user and group account administration utilities are configured to store
only encrypted representations of passwords.
New: The Red Hat Enterprise Linux operating system must be configured so that user and group account administration utilities are configured to store only encrypted representations of passwords.
---
V-71925:
Old: The Red Hat Enterprise Linux operating system must be configured so
that passwords for new users are restricted to a 24 hours&#x2F;1 day minimum
lifetime.
New: The Red Hat Enterprise Linux operating system must be configured so that passwords for new users are restricted to a 24 hours&#x2F;1 day minimum lifetime.
---
V-71927:
Old: The Red Hat Enterprise Linux operating system must be configured so
that passwords are restricted to a 24 hours&#x2F;1 day minimum lifetime.
New: The Red Hat Enterprise Linux operating system must be configured so that passwords are restricted to a 24 hours&#x2F;1 day minimum lifetime.
---
V-71929:
Old: The Red Hat Enterprise Linux operating system must be configured so
that passwords for new users are restricted to a 60-day maximum lifetime.
New: The Red Hat Enterprise Linux operating system must be configured so that passwords for new users are restricted to a 60-day maximum lifetime.
---
V-71931:
Old: The Red Hat Enterprise Linux operating system must be configured so
that existing passwords are restricted to a 60-day maximum lifetime.
New: The Red Hat Enterprise Linux operating system must be configured so that existing passwords are restricted to a 60-day maximum lifetime.
---
V-71933:
Old: The Red Hat Enterprise Linux operating system must be configured so
that passwords are prohibited from reuse for a minimum of five generations.
New: The Red Hat Enterprise Linux operating system must be configured so that passwords are prohibited from reuse for a minimum of five generations.
---
V-71935:
Old: The Red Hat Enterprise Linux operating system must be configured so
that passwords are a minimum of 15 characters in length.
New: The Red Hat Enterprise Linux operating system must be configured so that passwords are a minimum of 15 characters in length.
---
V-71937:
Old: The Red Hat Enterprise Linux operating system must not have accounts
configured with blank or null passwords.
New: The Red Hat Enterprise Linux operating system must not have accounts configured with blank or null passwords.
---
V-71939:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon does not allow authentication using an empty password.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon does not allow authentication using an empty password.
---
V-71941:
Old: The Red Hat Enterprise Linux operating system must disable account
identifiers (individuals, groups, roles, and devices) if the password expires.
New: The Red Hat Enterprise Linux operating system must disable account identifiers (individuals, groups, roles, and devices) if the password expires.
---
V-71943:
Old: The Red Hat Enterprise Linux operating system must be configured to
lock accounts for a minimum of 15 minutes after three unsuccessful logon
attempts within a 15-minute timeframe.
New: The Red Hat Enterprise Linux operating system must be configured to lock accounts for a minimum of 15 minutes after three unsuccessful logon attempts within a 15-minute timeframe.
---
V-71945:
Old: The Red Hat Enterprise Linux operating system must lock the associated
account after three unsuccessful root logon attempts are made within a
15-minute period.
New: The Red Hat Enterprise Linux operating system must lock the associated account after three unsuccessful root logon attempts are made within a 15-minute period.
---
V-71947:
Old: The Red Hat Enterprise Linux operating system must be configured so
that users must provide a password for privilege escalation.
New: The Red Hat Enterprise Linux operating system must be configured so that users must provide a password for privilege escalation.
---
V-71949:
Old: The Red Hat Enterprise Linux operating system must be configured so
that users must re-authenticate for privilege escalation.
New: The Red Hat Enterprise Linux operating system must be configured so that users must re-authenticate for privilege escalation.
---
V-71951:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the delay between logon prompts following a failed console logon attempt
is at least four seconds.
New: The Red Hat Enterprise Linux operating system must be configured so that the delay between logon prompts following a failed console logon attempt is at least four seconds.
---
V-71953:
Old: The Red Hat Enterprise Linux operating system must not allow an
unattended or automatic logon to the system via a graphical user interface.
New: The Red Hat Enterprise Linux operating system must not allow an unattended or automatic logon to the system via a graphical user interface.
---
V-71955:
Old: The Red Hat Enterprise Linux operating system must not allow an
unrestricted logon to the system.
New: The Red Hat Enterprise Linux operating system must not allow an unrestricted logon to the system.
---
V-71957:
Old: The Red Hat Enterprise Linux operating system must not allow users to
override SSH environment variables.
New: The Red Hat Enterprise Linux operating system must not allow users to override SSH environment variables.
---
V-71959:
Old: The Red Hat Enterprise Linux operating system must not allow a
non-certificate trusted host SSH logon to the system.
New: The Red Hat Enterprise Linux operating system must not allow a non-certificate trusted host SSH logon to the system.
---
V-71961:
Old: Red Hat Enterprise Linux operating systems prior to version 7.2 with a
Basic Input&#x2F;Output System (BIOS) must require authentication upon booting into
single-user and maintenance modes.
New: Red Hat Enterprise Linux operating systems prior to version 7.2 with a Basic Input&#x2F;Output System (BIOS) must require authentication upon booting into single-user and maintenance modes.
---
V-71963:
Old: Red Hat Enterprise Linux operating systems prior to version 7.2 using
Unified Extensible Firmware Interface (UEFI) must require authentication upon
booting into single-user and maintenance modes.
New: Red Hat Enterprise Linux operating systems prior to version 7.2 using Unified Extensible Firmware Interface (UEFI) must require authentication upon booting into single-user and maintenance modes.
---
V-71965:
Old: The Red Hat Enterprise Linux operating system must uniquely identify
and must authenticate organizational users (or processes acting on behalf of
organizational users) using multifactor authentication.
New: The Red Hat Enterprise Linux operating system must uniquely identify and must authenticate organizational users (or processes acting on behalf of organizational users) using multifactor authentication.
---
V-71967:
Old: The Red Hat Enterprise Linux operating system must not have the
rsh-server package installed.
New: The Red Hat Enterprise Linux operating system must not have the rsh-server package installed.
---
V-71969:
Old: The Red Hat Enterprise Linux operating system must not have the ypserv
package installed.
New: The Red Hat Enterprise Linux operating system must not have the ypserv package installed.
---
V-71971:
Old: The Red Hat Enterprise Linux operating system must prevent
non-privileged users from executing privileged functions to include disabling,
circumventing, or altering implemented security safeguards&#x2F;countermeasures.
New: The Red Hat Enterprise Linux operating system must prevent non-privileged users from executing privileged functions to include disabling, circumventing, or altering implemented security safeguards&#x2F;countermeasures.
---
V-71973:
Old: The Red Hat Enterprise Linux operating system must be configured so
that a file integrity tool verifies the baseline operating system configuration
at least weekly.
New: The Red Hat Enterprise Linux operating system must be configured so that a file integrity tool verifies the baseline operating system configuration at least weekly.
---
V-71975:
Old: The Red Hat Enterprise Linux operating system must be configured so
that designated personnel are notified if baseline configurations are changed
in an unauthorized manner.
New: The Red Hat Enterprise Linux operating system must be configured so that designated personnel are notified if baseline configurations are changed in an unauthorized manner.
---
V-71977:
Old: The Red Hat Enterprise Linux operating system must prevent the
installation of software, patches, service packs, device drivers, or operating
system components from a repository without verification they have been
digitally signed using a certificate that is issued by a Certificate Authority
(CA) that is recognized and approved by the organization.
New: The Red Hat Enterprise Linux operating system must prevent the installation of software, patches, service packs, device drivers, or operating system components from a repository without verification they have been digitally signed using a certificate that is issued by a Certificate Authority (CA) that is recognized and approved by the organization.
---
V-71979:
Old: The Red Hat Enterprise Linux operating system must prevent the
installation of software, patches, service packs, device drivers, or operating
system components of local packages without verification they have been
digitally signed using a certificate that is issued by a Certificate Authority
(CA) that is recognized and approved by the organization.
New: The Red Hat Enterprise Linux operating system must prevent the installation of software, patches, service packs, device drivers, or operating system components of local packages without verification they have been digitally signed using a certificate that is issued by a Certificate Authority (CA) that is recognized and approved by the organization.
---
V-71983:
Old: The Red Hat Enterprise Linux operating system must be configured to
disable USB mass storage.
New: The Red Hat Enterprise Linux operating system must be configured to disable USB mass storage.
---
V-71985:
Old: The Red Hat Enterprise Linux operating system must disable the file
system automounter unless required.
New: The Red Hat Enterprise Linux operating system must disable the file system automounter unless required.
---
V-71987:
Old: The Red Hat Enterprise Linux operating system must remove all software
components after updated versions have been installed.
New: The Red Hat Enterprise Linux operating system must remove all software components after updated versions have been installed.
---
V-71991:
Old: The Red Hat Enterprise Linux operating system must enable the SELinux
targeted policy.
New: The Red Hat Enterprise Linux operating system must enable the SELinux targeted policy.
---
V-71993:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the x86 Ctrl-Alt-Delete key sequence is disabled on the command line.
New: The Red Hat Enterprise Linux operating system must be configured so that the x86 Ctrl-Alt-Delete key sequence is disabled on the command line.
---
V-71995:
Old: The Red Hat Enterprise Linux operating system must define default
permissions for all authenticated users in such a way that the user can only
read and modify their own files.
New: The Red Hat Enterprise Linux operating system must define default permissions for all authenticated users in such a way that the user can only read and modify their own files.
---
V-71997:
Old: The Red Hat Enterprise Linux operating system must be a vendor
supported release.
New: The Red Hat Enterprise Linux operating system must be a vendor supported release.
---
V-71999:
Old: The Red Hat Enterprise Linux operating system security patches and
        updates must be installed and up to date.
New: The Red Hat Enterprise Linux operating system security patches and updates must be installed and up to date.
---
V-72001:
Old: The Red Hat Enterprise Linux operating system must not have
unnecessary accounts.
New: The Red Hat Enterprise Linux operating system must not have unnecessary accounts.
---
V-72003:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all Group Identifiers (GIDs) referenced in the &#x2F;etc&#x2F;passwd file are
defined in the &#x2F;etc&#x2F;group file.
New: The Red Hat Enterprise Linux operating system must be configured so that all Group Identifiers (GIDs) referenced in the &#x2F;etc&#x2F;passwd file are defined in the &#x2F;etc&#x2F;group file.
---
V-72005:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the root account must be the only account having unrestricted access to
the system.
New: The Red Hat Enterprise Linux operating system must be configured so that the root account must be the only account having unrestricted access to the system.
---
V-72007:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all files and directories have a valid owner.
New: The Red Hat Enterprise Linux operating system must be configured so that all files and directories have a valid owner.
---
V-72009:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all files and directories have a valid group owner.
New: The Red Hat Enterprise Linux operating system must be configured so that all files and directories have a valid group owner.
---
V-72011:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all local interactive users have a home directory assigned in the
&#x2F;etc&#x2F;passwd file.
New: The Red Hat Enterprise Linux operating system must be configured so that all local interactive users have a home directory assigned in the &#x2F;etc&#x2F;passwd file.
---
V-72013:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all local interactive user accounts, upon creation, are assigned a home
directory.
New: The Red Hat Enterprise Linux operating system must be configured so that all local interactive user accounts, upon creation, are assigned a home directory.
---
V-72015:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all local interactive user home directories are defined in the &#x2F;etc&#x2F;passwd
file.
New: The Red Hat Enterprise Linux operating system must be configured so that all local interactive user home directories are defined in the &#x2F;etc&#x2F;passwd file.
---
V-72017:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all local interactive user home directories have mode 0750 or less
permissive.
New: The Red Hat Enterprise Linux operating system must be configured so that all local interactive user home directories have mode 0750 or less permissive.
---
V-72019:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all local interactive user home directories are owned by their respective
users.
New: The Red Hat Enterprise Linux operating system must be configured so that all local interactive user home directories are owned by their respective users.
---
V-72021:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all local interactive user home directories are group-owned by the home
directory owners primary group.
New: The Red Hat Enterprise Linux operating system must be configured so that all local interactive user home directories are group-owned by the home directory owners primary group.
---
V-72023:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all files and directories contained in local interactive user home
directories are owned by the owner of the home directory.
New: The Red Hat Enterprise Linux operating system must be configured so that all files and directories contained in local interactive user home directories are owned by the owner of the home directory.
---
V-72025:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all files and directories contained in local interactive user home
directories are group-owned by a group of which the home directory owner is a
member.
New: The Red Hat Enterprise Linux operating system must be configured so that all files and directories contained in local interactive user home directories are group-owned by a group of which the home directory owner is a member.
---
V-72027:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all files and directories contained in local interactive user home
directories have a mode of 0750 or less permissive.
New: The Red Hat Enterprise Linux operating system must be configured so that all files and directories contained in local interactive user home directories have a mode of 0750 or less permissive.
---
V-72029:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all local initialization files for interactive users are owned by the home
directory user or root.
New: The Red Hat Enterprise Linux operating system must be configured so that all local initialization files for interactive users are owned by the home directory user or root.
---
V-72031:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all local initialization files for local interactive users are be
group-owned by the users primary group or root.
New: The Red Hat Enterprise Linux operating system must be configured so that all local initialization files for local interactive users are be group-owned by the users primary group or root.
---
V-72033:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all local initialization files have mode 0740 or less permissive.
New: The Red Hat Enterprise Linux operating system must be configured so that all local initialization files have mode 0740 or less permissive.
---
V-72035:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all local interactive user initialization files executable search paths
contain only paths that resolve to the users home directory.
New: The Red Hat Enterprise Linux operating system must be configured so that all local interactive user initialization files executable search paths contain only paths that resolve to the users home directory.
---
V-72037:
Old: The Red Hat Enterprise Linux operating system must be configured so
that local initialization files do not execute world-writable programs.
New: The Red Hat Enterprise Linux operating system must be configured so that local initialization files do not execute world-writable programs.
---
V-72039:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all system device files are correctly labeled to prevent unauthorized
modification.
New: The Red Hat Enterprise Linux operating system must be configured so that all system device files are correctly labeled to prevent unauthorized modification.
---
V-72041:
Old: The Red Hat Enterprise Linux operating system must be configured so
that file systems containing user home directories are mounted to prevent files
with the setuid and setgid bit set from being executed.
New: The Red Hat Enterprise Linux operating system must be configured so that file systems containing user home directories are mounted to prevent files with the setuid and setgid bit set from being executed.
---
V-72043:
Old: The Red Hat Enterprise Linux operating system must prevent files with
the setuid and setgid bit set from being executed on file systems that are used
with removable media.
New: The Red Hat Enterprise Linux operating system must prevent files with the setuid and setgid bit set from being executed on file systems that are used with removable media.
---
V-72045:
Old: The Red Hat Enterprise Linux operating system must prevent files with
the setuid and setgid bit set from being executed on file systems that are
being imported via Network File System (NFS).
New: The Red Hat Enterprise Linux operating system must prevent files with the setuid and setgid bit set from being executed on file systems that are being imported via Network File System (NFS).
---
V-72047:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all world-writable directories are group-owned by root, sys, bin, or an
application group.
New: The Red Hat Enterprise Linux operating system must be configured so that all world-writable directories are group-owned by root, sys, bin, or an application group.
---
V-72049:
Old: The Red Hat Enterprise Linux operating system must set the umask value
to 077 for all local interactive user accounts.
New: The Red Hat Enterprise Linux operating system must set the umask value to 077 for all local interactive user accounts.
---
V-72051:
Old: The Red Hat Enterprise Linux operating system must have cron logging
implemented.
New: The Red Hat Enterprise Linux operating system must have cron logging implemented.
---
V-72053:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the cron.allow file, if it exists, is owned by root.
New: The Red Hat Enterprise Linux operating system must be configured so that the cron.allow file, if it exists, is owned by root.
---
V-72055:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the cron.allow file, if it exists, is group-owned by root.
New: The Red Hat Enterprise Linux operating system must be configured so that the cron.allow file, if it exists, is group-owned by root.
---
V-72057:
Old: The Red Hat Enterprise Linux operating system must disable Kernel core
dumps unless needed.
New: The Red Hat Enterprise Linux operating system must disable Kernel core dumps unless needed.
---
V-72059:
Old: The Red Hat Enterprise Linux operating system must be configured so
that a separate file system is used for user home directories (such as &#x2F;home or
an equivalent).
New: The Red Hat Enterprise Linux operating system must be configured so that a separate file system is used for user home directories (such as &#x2F;home or an equivalent).
---
V-72061:
Old: The Red Hat Enterprise Linux operating system must use a separate file
system for &#x2F;var.
New: The Red Hat Enterprise Linux operating system must use a separate file system for &#x2F;var.
---
V-72063:
Old: The Red Hat Enterprise Linux operating system must use a separate file
system for the system audit data path.
New: The Red Hat Enterprise Linux operating system must use a separate file system for the system audit data path.
---
V-72065:
Old: The Red Hat Enterprise Linux operating system must use a separate file
system for &#x2F;tmp (or equivalent).
New: The Red Hat Enterprise Linux operating system must use a separate file system for &#x2F;tmp (or equivalent).
---
V-72067:
Old: The Red Hat Enterprise Linux operating system must implement NIST
FIPS-validated cryptography for the following: to provision digital signatures,
to generate cryptographic hashes, and to protect data requiring data-at-rest
protections in accordance with applicable federal laws, Executive Orders,
directives, policies, regulations, and standards.
New: The Red Hat Enterprise Linux operating system must implement NIST FIPS-validated cryptography for the following: to provision digital signatures, to generate cryptographic hashes, and to protect data requiring data-at-rest protections in accordance with applicable federal laws, Executive Orders, directives, policies, regulations, and standards.
---
V-72069:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the file integrity tool is configured to verify Access Control Lists
(ACLs).
New: The Red Hat Enterprise Linux operating system must be configured so that the file integrity tool is configured to verify Access Control Lists (ACLs).
---
V-72071:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the file integrity tool is configured to verify extended attributes.
New: The Red Hat Enterprise Linux operating system must be configured so that the file integrity tool is configured to verify extended attributes.
---
V-72073:
Old: The Red Hat Enterprise Linux operating system must use a file
integrity tool that is configured to use FIPS 140-2 approved cryptographic
hashes for validating file contents and directories.
New: The Red Hat Enterprise Linux operating system must use a file integrity tool that is configured to use FIPS 140-2 approved cryptographic hashes for validating file contents and directories.
---
V-72075:
Old: The Red Hat Enterprise Linux operating system must not allow removable
media to be used as the boot loader unless approved.
New: The Red Hat Enterprise Linux operating system must not allow removable media to be used as the boot loader unless approved.
---
V-72077:
Old: The Red Hat Enterprise Linux operating system must not have the
telnet-server package installed.
New: The Red Hat Enterprise Linux operating system must not have the telnet-server package installed.
---
V-72079:
Old: The Red Hat Enterprise Linux operating system must be configured so
that auditing is configured to produce records containing information to
establish what type of events occurred, where the events occurred, the source
of the events, and the outcome of the events. These audit records must also
identify individual identities of group account users.
New: The Red Hat Enterprise Linux operating system must be configured so that auditing is configured to produce records containing information to establish what type of events occurred, where the events occurred, the source of the events, and the outcome of the events. These audit records must also identify individual identities of group account users.
---
V-72081:
Old: The Red Hat Enterprise Linux operating system must shut down upon
audit processing failure, unless availability is an overriding concern. If
availability is a concern, the system must alert the designated staff (System
Administrator [SA] and Information System Security Officer [ISSO] at a minimum)
in the event of an audit processing failure.
New: The Red Hat Enterprise Linux operating system must shut down upon audit processing failure, unless availability is an overriding concern. If availability is a concern, the system must alert the designated staff (System Administrator [SA] and Information System Security Officer [ISSO] at a minimum) in the event of an audit processing failure.
---
V-72083:
Old: The Red Hat Enterprise Linux operating system must off-load audit
records onto a different system or media from the system being audited.
New: The Red Hat Enterprise Linux operating system must off-load audit records onto a different system or media from the system being audited.
---
V-72085:
Old: The Red Hat Enterprise Linux operating system must encrypt the
transfer of audit records off-loaded onto a different system or media from the
system being audited.
New: The Red Hat Enterprise Linux operating system must encrypt the transfer of audit records off-loaded onto a different system or media from the system being audited.
---
V-72087:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the audit system takes appropriate action when the audit storage volume is
full.
New: The Red Hat Enterprise Linux operating system must be configured so that the audit system takes appropriate action when the audit storage volume is full.
---
V-72089:
Old: The Red Hat Enterprise Linux operating system must initiate an action
to notify the System Administrator (SA) and Information System Security Officer
ISSO, at a minimum, when allocated audit record storage volume reaches 75% of
the repository maximum audit record storage capacity.
New: The Red Hat Enterprise Linux operating system must initiate an action to notify the System Administrator (SA) and Information System Security Officer ISSO, at a minimum, when allocated audit record storage volume reaches 75% of the repository maximum audit record storage capacity.
---
V-72091:
Old: The Red Hat Enterprise Linux operating system must immediately notify
the System Administrator (SA) and Information System Security Officer (ISSO)
(at a minimum) via email when the threshold for the repository maximum audit
record storage capacity is reached.
New: The Red Hat Enterprise Linux operating system must immediately notify the System Administrator (SA) and Information System Security Officer (ISSO) (at a minimum) via email when the threshold for the repository maximum audit record storage capacity is reached.
---
V-72093:
Old: The Red Hat Enterprise Linux operating system must immediately notify
the System Administrator (SA) and Information System Security Officer (ISSO)
(at a minimum) when the threshold for the repository maximum audit record
storage capacity is reached.
New: The Red Hat Enterprise Linux operating system must immediately notify the System Administrator (SA) and Information System Security Officer (ISSO) (at a minimum) when the threshold for the repository maximum audit record storage capacity is reached.
---
V-72095:
Old: The Red Hat Enterprise Linux operating system must audit all
executions of privileged functions.
New: The Red Hat Enterprise Linux operating system must audit all executions of privileged functions.
---
V-72097:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the chown syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the chown syscall.
---
V-72099:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the fchown syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the fchown syscall.
---
V-72101:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the lchown syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the lchown syscall.
---
V-72103:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the fchownat syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the fchownat syscall.
---
V-72105:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the chmod syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the chmod syscall.
---
V-72107:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the fchmod syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the fchmod syscall.
---
V-72109:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the fchmodat syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the fchmodat syscall.
---
V-72111:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the setxattr syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the setxattr syscall.
---
V-72113:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the fsetxattr syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the fsetxattr syscall.
---
V-72115:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the lsetxattr syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the lsetxattr syscall.
---
V-72117:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the removexattr syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the removexattr syscall.
---
V-72119:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the fremovexattr syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the fremovexattr syscall.
---
V-72121:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the lremovexattr syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the lremovexattr syscall.
---
V-72123:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the creat syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the creat syscall.
---
V-72125:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the open syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the open syscall.
---
V-72127:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the openat syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the openat syscall.
---
V-72129:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the open_by_handle_at syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the open_by_handle_at syscall.
---
V-72131:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the truncate syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the truncate syscall.
---
V-72133:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the ftruncate syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the ftruncate syscall.
---
V-72135:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the semanage command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the semanage command.
---
V-72137:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the setsebool command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the setsebool command.
---
V-72139:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the chcon command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the chcon command.
---
V-72141:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the setfiles command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the setfiles command.
---
V-72145:
Old: The Red Hat Enterprise Linux operating system must generate audit
records for all unsuccessful account access events.
New: The Red Hat Enterprise Linux operating system must generate audit records for all unsuccessful account access events.
---
V-72147:
Old: The Red Hat Enterprise Linux operating system must generate audit
records for all successful account access events.
New: The Red Hat Enterprise Linux operating system must generate audit records for all successful account access events.
---
V-72149:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the passwd command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the passwd command.
---
V-72151:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the unix_chkpwd command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the unix_chkpwd command.
---
V-72153:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the gpasswd command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the gpasswd command.
---
V-72155:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the chage command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the chage command.
---
V-72157:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the userhelper command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the userhelper command.
---
V-72159:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the su command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the su command.
---
V-72161:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the sudo command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the sudo command.
---
V-72163:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the sudoers file and all files in the &#x2F;etc&#x2F;sudoers.d&#x2F; directory.
New: The Red Hat Enterprise Linux operating system must audit all uses of the sudoers file and all files in the &#x2F;etc&#x2F;sudoers.d&#x2F; directory.
---
V-72165:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the newgrp command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the newgrp command.
---
V-72167:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the chsh command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the chsh command.
---
V-72171:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the mount command and syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the mount command and syscall.
---
V-72173:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the umount command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the umount command.
---
V-72175:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the postdrop command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the postdrop command.
---
V-72177:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the postqueue command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the postqueue command.
---
V-72179:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the ssh-keysign command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the ssh-keysign command.
---
V-72183:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the crontab command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the crontab command.
---
V-72185:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the pam_timestamp_check command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the pam_timestamp_check command.
---
V-72187:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the init_module syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the init_module syscall.
---
V-72189:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the delete_module syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the delete_module syscall.
---
V-72191:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the kmod command.
New: The Red Hat Enterprise Linux operating system must audit all uses of the kmod command.
---
V-72197:
Old: The Red Hat Enterprise Linux operating system must generate audit
records for all account creations, modifications, disabling, and termination
events that affect &#x2F;etc&#x2F;passwd.
New: The Red Hat Enterprise Linux operating system must generate audit records for all account creations, modifications, disabling, and termination events that affect &#x2F;etc&#x2F;passwd.
---
V-72199:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the rename syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the rename syscall.
---
V-72201:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the renameat syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the renameat syscall.
---
V-72203:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the rmdir syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the rmdir syscall.
---
V-72205:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the unlink syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the unlink syscall.
---
V-72207:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the unlinkat syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the unlinkat syscall.
---
V-72209:
Old: The Red Hat Enterprise Linux operating system must send rsyslog output
to a log aggregation server.
New: The Red Hat Enterprise Linux operating system must send rsyslog output to a log aggregation server.
---
V-72211:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the rsyslog daemon does not accept log messages from other servers unless
the server is being used for log aggregation.
New: The Red Hat Enterprise Linux operating system must be configured so that the rsyslog daemon does not accept log messages from other servers unless the server is being used for log aggregation.
---
V-72213:
Old: The Red Hat Enterprise Linux operating system must use a virus scan
program.
New: The Red Hat Enterprise Linux operating system must use a virus scan program.
---
V-72217:
Old: The Red Hat Enterprise Linux operating system must limit the number of
concurrent sessions to 10 for all accounts and&#x2F;or account types.
New: The Red Hat Enterprise Linux operating system must limit the number of concurrent sessions to 10 for all accounts and&#x2F;or account types.
---
V-72219:
Old: The Red Hat Enterprise Linux operating system must be configured to
prohibit or restrict the use of functions, ports, protocols, and&#x2F;or services,
as defined in the Ports, Protocols, and Services Management Component Local
Service Assessment (PPSM CLSA) and vulnerability assessments.
New: The Red Hat Enterprise Linux operating system must be configured to prohibit or restrict the use of functions, ports, protocols, and&#x2F;or services, as defined in the Ports, Protocols, and Services Management Component Local Service Assessment (PPSM CLSA) and vulnerability assessments.
---
V-72221:
Old: The Red Hat Enterprise Linux operating system must use a FIPS 140-2
approved cryptographic algorithm for SSH communications.
New: The Red Hat Enterprise Linux operating system must use a FIPS 140-2 approved cryptographic algorithm for SSH communications.
---
V-72223:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all network connections associated with a communication session are
terminated at the end of the session or after 10 minutes of inactivity from the
user at a command prompt, except to fulfill documented and validated mission
requirements.
New: The Red Hat Enterprise Linux operating system must be configured so that all network connections associated with a communication session are terminated at the end of the session or after 10 minutes of inactivity from the user at a command prompt, except to fulfill documented and validated mission requirements.
---
V-72225:
Old: The Red Hat Enterprise Linux operating system must display the
Standard Mandatory DoD Notice and Consent Banner immediately prior to, or as
part of, remote access logon prompts.
New: The Red Hat Enterprise Linux operating system must display the Standard Mandatory DoD Notice and Consent Banner immediately prior to, or as part of, remote access logon prompts.
---
V-72227:
Old: The Red Hat Enterprise Linux operating system must implement
cryptography to protect the integrity of Lightweight Directory Access Protocol
(LDAP) authentication communications.
New: The Red Hat Enterprise Linux operating system must implement cryptography to protect the integrity of Lightweight Directory Access Protocol (LDAP) authentication communications.
---
V-72229:
Old: The Red Hat Enterprise Linux operating system must implement
cryptography to protect the integrity of Lightweight Directory Access Protocol
(LDAP) communications.
New: The Red Hat Enterprise Linux operating system must implement cryptography to protect the integrity of Lightweight Directory Access Protocol (LDAP) communications.
---
V-72231:
Old: The Red Hat Enterprise Linux operating system must implement
cryptography to protect the integrity of Lightweight Directory Access Protocol
(LDAP) communications.
New: The Red Hat Enterprise Linux operating system must implement cryptography to protect the integrity of Lightweight Directory Access Protocol (LDAP) communications.
---
V-72233:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all networked systems have SSH installed.
New: The Red Hat Enterprise Linux operating system must be configured so that all networked systems have SSH installed.
---
V-72235:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all networked systems use SSH for confidentiality and integrity of
transmitted and received information as well as information during preparation
for transmission.
New: The Red Hat Enterprise Linux operating system must be configured so that all networked systems use SSH for confidentiality and integrity of transmitted and received information as well as information during preparation for transmission.
---
V-72237:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all network connections associated with SSH traffic are terminated at the
end of the session or after 10 minutes of inactivity, except to fulfill
documented and validated mission requirements.
New: The Red Hat Enterprise Linux operating system must be configured so that all network connections associated with SSH traffic are terminated at the end of the session or after 10 minutes of inactivity, except to fulfill documented and validated mission requirements.
---
V-72239:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon does not allow authentication using RSA rhosts
authentication.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon does not allow authentication using RSA rhosts authentication.
---
V-72241:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all network connections associated with SSH traffic terminate after a
period of inactivity.
New: The Red Hat Enterprise Linux operating system must be configured so that all network connections associated with SSH traffic terminate after a period of inactivity.
---
V-72243:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon does not allow authentication using rhosts authentication.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon does not allow authentication using rhosts authentication.
---
V-72245:
Old: The Red Hat Enterprise Linux operating system must display the date
and time of the last successful account logon upon an SSH logon.
New: The Red Hat Enterprise Linux operating system must display the date and time of the last successful account logon upon an SSH logon.
---
V-72247:
Old: The Red Hat Enterprise Linux operating system must not permit direct
logons to the root account using remote access via SSH.
New: The Red Hat Enterprise Linux operating system must not permit direct logons to the root account using remote access via SSH.
---
V-72249:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon does not allow authentication using known hosts
authentication.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon does not allow authentication using known hosts authentication.
---
V-72251:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon is configured to only use the SSHv2 protocol.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon is configured to only use the SSHv2 protocol.
---
V-72253:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon is configured to only use Message Authentication Codes
(MACs) employing FIPS 140-2 approved cryptographic hash algorithms.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon is configured to only use Message Authentication Codes (MACs) employing FIPS 140-2 approved cryptographic hash algorithms.
---
V-72255:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH public host key files have mode 0644 or less permissive.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH public host key files have mode 0644 or less permissive.
---
V-72257:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH private host key files have mode 0640 or less permissive.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH private host key files have mode 0640 or less permissive.
---
V-72259:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon does not permit Generic Security Service Application
Program Interface (GSSAPI) authentication unless needed.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon does not permit Generic Security Service Application Program Interface (GSSAPI) authentication unless needed.
---
V-72261:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon does not permit Kerberos authentication unless needed.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon does not permit Kerberos authentication unless needed.
---
V-72263:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon performs strict mode checking of home directory
configuration files.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon performs strict mode checking of home directory configuration files.
---
V-72265:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon uses privilege separation.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon uses privilege separation.
---
V-72267:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the SSH daemon does not allow compression or only allows compression after
successful authentication.
New: The Red Hat Enterprise Linux operating system must be configured so that the SSH daemon does not allow compression or only allows compression after successful authentication.
---
V-72269:
Old: The Red Hat Enterprise Linux operating system must, for networked
systems, synchronize clocks with a server that is synchronized to one of the
redundant United States Naval Observatory (USNO) time servers, a time server
designated for the appropriate DoD network (NIPRNet&#x2F;SIPRNet), and&#x2F;or the Global
Positioning System (GPS).
New: The Red Hat Enterprise Linux operating system must, for networked systems, synchronize clocks with a server that is synchronized to one of the redundant United States Naval Observatory (USNO) time servers, a time server designated for the appropriate DoD network (NIPRNet&#x2F;SIPRNet), and&#x2F;or the Global Positioning System (GPS).
---
V-72273:
Old: The Red Hat Enterprise Linux operating system must enable an
application firewall, if available.
New: The Red Hat Enterprise Linux operating system must enable an application firewall, if available.
---
V-72275:
Old: The Red Hat Enterprise Linux operating system must display the date
and time of the last successful account logon upon logon.
New: The Red Hat Enterprise Linux operating system must display the date and time of the last successful account logon upon logon.
---
V-72277:
Old: The Red Hat Enterprise Linux operating system must not contain .shosts
files.
New: The Red Hat Enterprise Linux operating system must not contain .shosts files.
---
V-72279:
Old: The Red Hat Enterprise Linux operating system must not contain
shosts.equiv files.
New: The Red Hat Enterprise Linux operating system must not contain shosts.equiv files.
---
V-72281:
Old: For Red Hat Enterprise Linux operating systems using DNS resolution,
at least two name servers must be configured.
New: For Red Hat Enterprise Linux operating systems using DNS resolution, at least two name servers must be configured.
---
V-72283:
Old: The Red Hat Enterprise Linux operating system must not forward
Internet Protocol version 4 (IPv4) source-routed packets.
New: The Red Hat Enterprise Linux operating system must not forward Internet Protocol version 4 (IPv4) source-routed packets.
---
V-72285:
Old: The Red Hat Enterprise Linux operating system must not forward
Internet Protocol version 4 (IPv4) source-routed packets by default.
New: The Red Hat Enterprise Linux operating system must not forward Internet Protocol version 4 (IPv4) source-routed packets by default.
---
V-72287:
Old: The Red Hat Enterprise Linux operating system must not respond to
Internet Protocol version 4 (IPv4) Internet Control Message Protocol (ICMP)
echoes sent to a broadcast address.
New: The Red Hat Enterprise Linux operating system must not respond to Internet Protocol version 4 (IPv4) Internet Control Message Protocol (ICMP) echoes sent to a broadcast address.
---
V-72289:
Old: The Red Hat Enterprise Linux operating system must prevent Internet
Protocol version 4 (IPv4) Internet Control Message Protocol (ICMP) redirect
messages from being accepted.
New: The Red Hat Enterprise Linux operating system must prevent Internet Protocol version 4 (IPv4) Internet Control Message Protocol (ICMP) redirect messages from being accepted.
---
V-72291:
Old: The Red Hat Enterprise Linux operating system must not allow
interfaces to perform Internet Protocol version 4 (IPv4) Internet Control
Message Protocol (ICMP) redirects by default.
New: The Red Hat Enterprise Linux operating system must not allow interfaces to perform Internet Protocol version 4 (IPv4) Internet Control Message Protocol (ICMP) redirects by default.
---
V-72293:
Old: The Red Hat Enterprise Linux operating system must not send Internet
Protocol version 4 (IPv4) Internet Control Message Protocol (ICMP) redirects.
New: The Red Hat Enterprise Linux operating system must not send Internet Protocol version 4 (IPv4) Internet Control Message Protocol (ICMP) redirects.
---
V-72295:
Old: Network interfaces configured on the Red Hat Enterprise Linux
operating system must not be in promiscuous mode.
New: Network interfaces configured on the Red Hat Enterprise Linux operating system must not be in promiscuous mode.
---
V-72297:
Old: The Red Hat Enterprise Linux operating system must be configured to
prevent unrestricted mail relaying.
New: The Red Hat Enterprise Linux operating system must be configured to prevent unrestricted mail relaying.
---
V-72299:
Old: The Red Hat Enterprise Linux operating system must not have a File
Transfer Protocol (FTP) server package installed unless needed.
New: The Red Hat Enterprise Linux operating system must not have a File Transfer Protocol (FTP) server package installed unless needed.
---
V-72301:
Old: The Red Hat Enterprise Linux operating system must not have the
Trivial File Transfer Protocol (TFTP) server package installed if not required
for operational support.
New: The Red Hat Enterprise Linux operating system must not have the Trivial File Transfer Protocol (TFTP) server package installed if not required for operational support.
---
V-72303:
Old: The Red Hat Enterprise Linux operating system must be configured so
that remote X connections for interactive users are encrypted.
New: The Red Hat Enterprise Linux operating system must be configured so that remote X connections for interactive users are encrypted.
---
V-72305:
Old: The Red Hat Enterprise Linux operating system must be configured so
that if the Trivial File Transfer Protocol (TFTP) server is required, the TFTP
daemon is configured to operate in secure mode.
New: The Red Hat Enterprise Linux operating system must be configured so that if the Trivial File Transfer Protocol (TFTP) server is required, the TFTP daemon is configured to operate in secure mode.
---
V-72307:
Old: The Red Hat Enterprise Linux operating system must not have an X
Windows display manager installed unless approved.
New: The Red Hat Enterprise Linux operating system must not have an X Windows display manager installed unless approved.
---
V-72309:
Old: The Red Hat Enterprise Linux operating system must not be performing
packet forwarding unless the system is a router.
New: The Red Hat Enterprise Linux operating system must not be performing packet forwarding unless the system is a router.
---
V-72311:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the Network File System (NFS) is configured to use RPCSEC_GSS.
New: The Red Hat Enterprise Linux operating system must be configured so that the Network File System (NFS) is configured to use RPCSEC_GSS.
---
V-72313:
Old: SNMP community strings on the Red Hat Enterprise Linux operating
system must be changed from the default.
New: SNMP community strings on the Red Hat Enterprise Linux operating system must be changed from the default.
---
V-72315:
Old: The Red Hat Enterprise Linux operating system access control program
must be configured to grant or deny system access to specific hosts and
services.
New: The Red Hat Enterprise Linux operating system access control program must be configured to grant or deny system access to specific hosts and services.
---
V-72317:
Old: The Red Hat Enterprise Linux operating system must not have
unauthorized IP tunnels configured.
New: The Red Hat Enterprise Linux operating system must not have unauthorized IP tunnels configured.
---
V-72319:
Old: The Red Hat Enterprise Linux operating system must not forward IPv6
source-routed packets.
New: The Red Hat Enterprise Linux operating system must not forward IPv6 source-routed packets.
---
V-72417:
Old: The Red Hat Enterprise Linux operating system must have the required
        packages for multifactor authentication installed.
New: The Red Hat Enterprise Linux operating system must have the required packages for multifactor authentication installed.
---
V-72427:
Old: The Red Hat Enterprise Linux operating system must implement
  multifactor authentication for access to privileged accounts via pluggable
  authentication modules (PAM).
New: The Red Hat Enterprise Linux operating system must implement multifactor authentication for access to privileged accounts via pluggable authentication modules (PAM).
---
V-72433:
Old: The Red Hat Enterprise Linux operating system must implement
certificate status checking for PKI authentication.
New: The Red Hat Enterprise Linux operating system must implement certificate status checking for PKI authentication.
---
V-73155:
Old: The Red Hat Enterprise Linux operating system must prevent a user from
  overriding the screensaver lock-delay setting for the graphical user interface.
New: The Red Hat Enterprise Linux operating system must prevent a user from overriding the screensaver lock-delay setting for the graphical user interface.
---
V-73157:
Old: The Red Hat Enterprise Linux operating system must prevent a user from
overriding the session idle-delay setting for the graphical user interface.
New: The Red Hat Enterprise Linux operating system must prevent a user from overriding the session idle-delay setting for the graphical user interface.
---
V-73159:
Old: The Red Hat Enterprise Linux operating system must be configured so
that when passwords are changed or new passwords are established, pwquality
must be used.
New: The Red Hat Enterprise Linux operating system must be configured so that when passwords are changed or new passwords are established, pwquality must be used.
---
V-73161:
Old: The Red Hat Enterprise Linux operating system must prevent binary
files from being executed on file systems that are being imported via Network
File System (NFS).
New: The Red Hat Enterprise Linux operating system must prevent binary files from being executed on file systems that are being imported via Network File System (NFS).
---
V-73163:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the audit system takes appropriate action when there is an error sending
audit records to a remote system.
New: The Red Hat Enterprise Linux operating system must be configured so that the audit system takes appropriate action when there is an error sending audit records to a remote system.
---
V-73165:
Old: The Red Hat Enterprise Linux operating system must generate audit
records for all account creations, modifications, disabling, and termination
events that affect &#x2F;etc&#x2F;group.
New: The Red Hat Enterprise Linux operating system must generate audit records for all account creations, modifications, disabling, and termination events that affect &#x2F;etc&#x2F;group.
---
V-73167:
Old: The Red Hat Enterprise Linux operating system must generate audit
records for all account creations, modifications, disabling, and termination
events that affect &#x2F;etc&#x2F;gshadow.
New: The Red Hat Enterprise Linux operating system must generate audit records for all account creations, modifications, disabling, and termination events that affect &#x2F;etc&#x2F;gshadow.
---
V-73171:
Old: The Red Hat Enterprise Linux operating system must generate audit
records for all account creations, modifications, disabling, and termination
events that affect &#x2F;etc&#x2F;shadow.
New: The Red Hat Enterprise Linux operating system must generate audit records for all account creations, modifications, disabling, and termination events that affect &#x2F;etc&#x2F;shadow.
---
V-73173:
Old: The Red Hat Enterprise Linux operating system must generate audit
records for all account creations, modifications, disabling, and termination
events that affect &#x2F;etc&#x2F;opasswd.
New: The Red Hat Enterprise Linux operating system must generate audit records for all account creations, modifications, disabling, and termination events that affect &#x2F;etc&#x2F;opasswd.
---
V-73175:
Old: The Red Hat Enterprise Linux operating system must ignore Internet
Protocol version 4 (IPv4) Internet Control Message Protocol (ICMP) redirect
messages.
New: The Red Hat Enterprise Linux operating system must ignore Internet Protocol version 4 (IPv4) Internet Control Message Protocol (ICMP) redirect messages.
---
V-73177:
Old: The Red Hat Enterprise Linux operating system must be configured so
that all wireless network adapters are disabled.
New: The Red Hat Enterprise Linux operating system must be configured so that all wireless network adapters are disabled.
---
V-77819:
Old: The Red Hat Enterprise Linux operating system must uniquely identify
and must authenticate users using multifactor authentication via a graphical
user logon.
New: The Red Hat Enterprise Linux operating system must uniquely identify and must authenticate users using multifactor authentication via a graphical user logon.
---
V-77821:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the Datagram Congestion Control Protocol (DCCP) kernel module is disabled
unless required.
New: The Red Hat Enterprise Linux operating system must be configured so that the Datagram Congestion Control Protocol (DCCP) kernel module is disabled unless required.
---
V-77823:
Old: The Red Hat Enterprise Linux operating system must require
authentication upon booting into single-user and maintenance modes.
New: The Red Hat Enterprise Linux operating system must require authentication upon booting into single-user and maintenance modes.
---
V-77825:
Old: The Red Hat Enterprise Linux operating system must implement virtual
address space randomization.
New: The Red Hat Enterprise Linux operating system must implement virtual address space randomization.
---
V-78995:
Old: The Red Hat Enterprise Linux operating system must prevent a user from
overriding the screensaver lock-enabled setting for the graphical user
interface.
New: The Red Hat Enterprise Linux operating system must prevent a user from overriding the screensaver lock-enabled setting for the graphical user interface.
---
V-78997:
Old: The Red Hat Enterprise Linux operating system must prevent a user from
overriding the screensaver idle-activation-enabled setting for the graphical
user interface.
New: The Red Hat Enterprise Linux operating system must prevent a user from overriding the screensaver idle-activation-enabled setting for the graphical user interface.
---
V-78999:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the create_module syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the create_module syscall.
---
V-79001:
Old: The Red Hat Enterprise Linux operating system must audit all uses of
the finit_module syscall.
New: The Red Hat Enterprise Linux operating system must audit all uses of the finit_module syscall.
---
V-81003:
Old: The Red Hat Enterprise Linux operating system must be configured so
that &#x2F;etc&#x2F;pam.d&#x2F;passwd implements &#x2F;etc&#x2F;pam.d&#x2F;system-auth when changing
passwords.
New: The Red Hat Enterprise Linux operating system must be configured so that &#x2F;etc&#x2F;pam.d&#x2F;passwd implements &#x2F;etc&#x2F;pam.d&#x2F;system-auth when changing passwords.
---
V-81005:
Old: Red Hat Enterprise Linux operating systems version 7.2 or newer with a
Basic Input&#x2F;Output System (BIOS) must require authentication upon booting into
single-user and maintenance modes.
New: Red Hat Enterprise Linux operating systems version 7.2 or newer with a Basic Input&#x2F;Output System (BIOS) must require authentication upon booting into single-user and maintenance modes.
---
V-81007:
Old: Red Hat Enterprise Linux operating systems version 7.2 or newer using
Unified Extensible Firmware Interface (UEFI) must require authentication upon
booting into single-user and maintenance modes.
New: Red Hat Enterprise Linux operating systems version 7.2 or newer using Unified Extensible Firmware Interface (UEFI) must require authentication upon booting into single-user and maintenance modes.
---
V-81009:
Old: The Red Hat Enterprise Linux operating system must mount &#x2F;dev&#x2F;shm with
the nodev option.
New: The Red Hat Enterprise Linux operating system must mount &#x2F;dev&#x2F;shm with the nodev option.
---
V-81011:
Old: The Red Hat Enterprise Linux operating system must mount &#x2F;dev&#x2F;shm with
the nosuid option.
New: The Red Hat Enterprise Linux operating system must mount &#x2F;dev&#x2F;shm with the nosuid option.
---
V-81013:
Old: The Red Hat Enterprise Linux operating system must mount &#x2F;dev&#x2F;shm with
the noexec option.
New: The Red Hat Enterprise Linux operating system must mount &#x2F;dev&#x2F;shm with the noexec option.
---
V-81015:
Old: The Red Hat Enterprise Linux operating system must be configured to
use the au-remote plugin.
New: The Red Hat Enterprise Linux operating system must be configured to use the au-remote plugin.
---
V-81017:
Old: The Red Hat Enterprise Linux operating system must configure the
au-remote plugin to off-load audit logs using the audisp-remote daemon.
New: The Red Hat Enterprise Linux operating system must configure the au-remote plugin to off-load audit logs using the audisp-remote daemon.
---
V-81019:
Old: The Red Hat Enterprise Linux operating system must take appropriate
action when the audisp-remote buffer is full.
New: The Red Hat Enterprise Linux operating system must take appropriate action when the audisp-remote buffer is full.
---
V-81021:
Old: The Red Hat Enterprise Linux operating system must label all
off-loaded audit logs before sending them to the central log server.
New: The Red Hat Enterprise Linux operating system must label all off-loaded audit logs before sending them to the central log server.
---
V-92251:
Old: The Red Hat Enterprise Linux operating system must use a reverse-path
filter for IPv4 network traffic when possible on all interfaces.
New: The Red Hat Enterprise Linux operating system must use a reverse-path filter for IPv4 network traffic when possible on all interfaces.
---
V-92253:
Old: The Red Hat Enterprise Linux operating system must use a reverse-path
filter for IPv4 network traffic when possible by default.
New: The Red Hat Enterprise Linux operating system must use a reverse-path filter for IPv4 network traffic when possible by default.
---
V-92255:
Old: The Red Hat Enterprise Linux operating system must have a host-based
intrusion detection tool installed.
New: The Red Hat Enterprise Linux operating system must have a host-based intrusion detection tool installed.
---
V-94843:
Old: The Red Hat Enterprise Linux operating system must be configured so
that the x86 Ctrl-Alt-Delete key sequence is disabled in the GUI.
New: The Red Hat Enterprise Linux operating system must be configured so that the x86 Ctrl-Alt-Delete key sequence is disabled in the Graphical User Interface.
---
</details>

### Updated Descriptions
<details>
  <summary>Click to expand.</summary>
V-71849:
Old:
```
Discretionary access control is weakened if a user or group has access
permissions to system files and directories greater than the default.

```
New:
```
Discretionary access control is weakened if a user or group has access permissions to system files and directories greater than the default.



```
---
V-71855:
Old:
```
Without cryptographic integrity protections, system command and files
can be altered by unauthorized users without detection.

    Cryptographic mechanisms used for protecting the integrity of information
include, for example, signed hash functions using asymmetric cryptography
enabling distribution of the public key to verify the hash information while
maintaining the confidentiality of the key used to generate the hash.

```
New:
```
Without cryptographic integrity protections, system command and files can be altered by unauthorized users without detection.

Cryptographic mechanisms used for protecting the integrity of information include, for example, signed hash functions using asymmetric cryptography enabling distribution of the public key to verify the hash information while maintaining the confidentiality of the key used to generate the hash.

```
---
V-71859:
Old:
```
Display of a standardized and approved use notification before
granting access to the operating system ensures privacy and security
notification verbiage used is consistent with applicable federal laws,
Executive Orders, directives, policies, regulations, standards, and guidance.

    System use notifications are required only for access via logon interfaces
with human users and are not required when such human interfaces do not exist.

    The banner must be formatted in accordance with applicable DoD policy. Use
the following verbiage for operating systems that can accommodate banners of
1300 characters:

    "You are accessing a U.S. Government (USG) Information System (IS) that is
provided for USG-authorized use only.

    By using this IS (which includes any device attached to this IS), you
consent to the following conditions:

    -The USG routinely intercepts and monitors communications on this IS for
purposes including, but not limited to, penetration testing, COMSEC monitoring,
network operations and defense, personnel misconduct (PM), law enforcement
(LE), and counterintelligence (CI) investigations.

    -At any time, the USG may inspect and seize data stored on this IS.

    -Communications using, or data stored on, this IS are not private, are
subject to routine monitoring, interception, and search, and may be disclosed
or used for any USG-authorized purpose.

    -This IS includes security measures (e.g., authentication and access
controls) to protect USG interests--not for your personal benefit or privacy.

    -Notwithstanding the above, using this IS does not constitute consent to
PM, LE or CI investigative searching or monitoring of the content of privileged
communications, or work product, related to personal representation or services
by attorneys, psychotherapists, or clergy, and their assistants. Such
communications and work product are private and confidential. See User
Agreement for details."

```
New:
```
Display of a standardized and approved use notification before granting access to the operating system ensures privacy and security notification verbiage used is consistent with applicable federal laws, Executive Orders, directives, policies, regulations, standards, and guidance.

System use notifications are required only for access via logon interfaces with human users and are not required when such human interfaces do not exist.

The banner must be formatted in accordance with applicable DoD policy. Use the following verbiage for operating systems that can accommodate banners of 1300 characters:

"You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.

By using this IS (which includes any device attached to this IS), you consent to the following conditions:

-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.

-At any time, the USG may inspect and seize data stored on this IS.

-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.

-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.

-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details."




```
---
V-71861:
Old:
```
Display of a standardized and approved use notification before
granting access to the operating system ensures privacy and security
notification verbiage used is consistent with applicable federal laws,
Executive Orders, directives, policies, regulations, standards, and guidance.
    System use notifications are required only for access via logon interfaces
with human users and are not required when such human interfaces do not exist.
    The banner must be formatted in accordance with applicable DoD policy. Use
the following verbiage for operating systems that can accommodate banners of
1300 characters:
    "You are accessing a U.S. Government (USG) Information System (IS) that is
provided for USG-authorized use only.
    By using this IS (which includes any device attached to this IS), you
consent to the following conditions:
    -The USG routinely intercepts and monitors communications on this IS for
purposes including, but not limited to, penetration testing, COMSEC monitoring,
network operations and defense, personnel misconduct (PM), law enforcement
(LE), and counterintelligence (CI) investigations.
    -At any time, the USG may inspect and seize data stored on this IS.
    -Communications using, or data stored on, this IS are not private, are
subject to routine monitoring, interception, and search, and may be disclosed
or used for any USG-authorized purpose.
    -This IS includes security measures (e.g., authentication and access
controls) to protect USG interests--not for your personal benefit or privacy.
    -Notwithstanding the above, using this IS does not constitute consent to
PM, LE or CI investigative searching or monitoring of the content of privileged
communications, or work product, related to personal representation or services
by attorneys, psychotherapists, or clergy, and their assistants. Such
communications and work product are private and confidential. See User
Agreement for details."

```
New:
```
Display of a standardized and approved use notification before granting access to the operating system ensures privacy and security notification verbiage used is consistent with applicable federal laws, Executive Orders, directives, policies, regulations, standards, and guidance.

System use notifications are required only for access via logon interfaces with human users and are not required when such human interfaces do not exist.

The banner must be formatted in accordance with applicable DoD policy.

"You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.

By using this IS (which includes any device attached to this IS), you consent to the following conditions:

-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.

-At any time, the USG may inspect and seize data stored on this IS.

-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.

-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.

-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details."



```
---
V-71863:
Old:
```
Display of a standardized and approved use notification before
granting access to the operating system ensures privacy and security
notification verbiage used is consistent with applicable federal laws,
Executive Orders, directives, policies, regulations, standards, and guidance.

    System use notifications are required only for access via logon interfaces
with human users and are not required when such human interfaces do not exist.

    The banner must be formatted in accordance with applicable DoD policy. Use
the following verbiage for operating systems that can accommodate banners of
1300 characters:

    "You are accessing a U.S. Government (USG) Information System (IS) that is
provided for USG-authorized use only.

    By using this IS (which includes any device attached to this IS), you
consent to the following conditions:

    -The USG routinely intercepts and monitors communications on this IS for
purposes including, but not limited to, penetration testing, COMSEC monitoring,
network operations and defense, personnel misconduct (PM), law enforcement
(LE), and counterintelligence (CI) investigations.

    -At any time, the USG may inspect and seize data stored on this IS.

    -Communications using, or data stored on, this IS are not private, are
subject to routine monitoring, interception, and search, and may be disclosed
or used for any USG-authorized purpose.

    -This IS includes security measures (e.g., authentication and access
controls) to protect USG interests--not for your personal benefit or privacy.

    -Notwithstanding the above, using this IS does not constitute consent to
PM, LE or CI investigative searching or monitoring of the content of privileged
communications, or work product, related to personal representation or services
by attorneys, psychotherapists, or clergy, and their assistants. Such
communications and work product are private and confidential. See User
Agreement for details."

```
New:
```
Display of a standardized and approved use notification before granting access to the operating system ensures privacy and security notification verbiage used is consistent with applicable federal laws, Executive Orders, directives, policies, regulations, standards, and guidance.

System use notifications are required only for access via logon interfaces with human users and are not required when such human interfaces do not exist.

The banner must be formatted in accordance with applicable DoD policy. Use the following verbiage for operating systems that can accommodate banners of 1300 characters:

"You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.

By using this IS (which includes any device attached to this IS), you consent to the following conditions:

-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.

-At any time, the USG may inspect and seize data stored on this IS.

-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.

-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.

-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details."



```
---
V-71891:
Old:
```
A session lock is a temporary action taken when a user stops work and
moves away from the immediate physical vicinity of the information system but
does not want to log out because of the temporary nature of the absence.

    The session lock is implemented at the point where session activity can be
determined.

    Regardless of where the session lock is determined and implemented, once
invoked, the session lock must remain in place until the user reauthenticates.
No other activity aside from reauthentication must unlock the system.

```
New:
```
A session lock is a temporary action taken when a user stops work and moves away from the immediate physical vicinity of the information system but does not want to log out because of the temporary nature of the absence.

The session lock is implemented at the point where session activity can be determined.

Regardless of where the session lock is determined and implemented, once invoked, the session lock must remain in place until the user reauthenticates. No other activity aside from reauthentication must unlock the system.



```
---
V-71893:
Old:
```
A session time-out lock is a temporary action taken when a user stops
work and moves away from the immediate physical vicinity of the information
system but does not log out because of the temporary nature of the absence.
Rather than relying on the user to manually lock their operating system session
prior to vacating the vicinity, operating systems need to be able to identify
when a user's session has idled and take action to initiate the session lock.

    The session lock is implemented at the point where session activity can be
determined and/or controlled.

```
New:
```
A session time-out lock is a temporary action taken when a user stops work and moves away from the immediate physical vicinity of the information system but does not log out because of the temporary nature of the absence. Rather than relying on the user to manually lock their operating system session prior to vacating the vicinity, operating systems need to be able to identify when a user's session has idled and take action to initiate the session lock.

The session lock is implemented at the point where session activity can be determined and/or controlled.

```
---
V-71897:
Old:
```
:  A session time-out lock is a temporary action taken when a user
stops work and moves away from the immediate physical vicinity of the
information system but does not log out because of the temporary nature of the
absence. Rather than relying on the user to manually lock their operating
system session prior to vacating the vicinity, operating systems need to be
able to identify when a user's session has idled and take action to initiate
the session lock.

    The screen and tmux packages allow for a session lock to be implemented and
configured.

```
New:
```
:  A session time-out lock is a temporary action taken when a user stops work and moves away from the immediate physical vicinity of the information system but does not log out because of the temporary nature of the absence. Rather than relying on the user to manually lock their operating system session prior to vacating the vicinity, operating systems need to be able to identify when a user's session has idled and take action to initiate the session lock.

The screen and tmux packages allow for a session lock to be implemented and configured.

```
---
V-71899:
Old:
```
A session time-out lock is a temporary action taken when a user stops
work and moves away from the immediate physical vicinity of the information
system but does not log out because of the temporary nature of the absence.
Rather than relying on the user to manually lock their operating system session
prior to vacating the vicinity, operating systems need to be able to identify
when a user's session has idled and take action to initiate the session lock.

    The session lock is implemented at the point where session activity can be
determined and/or controlled.

```
New:
```
A session time-out lock is a temporary action taken when a user stops work and moves away from the immediate physical vicinity of the information system but does not log out because of the temporary nature of the absence. Rather than relying on the user to manually lock their operating system session prior to vacating the vicinity, operating systems need to be able to identify when a user's session has idled and take action to initiate the session lock.

The session lock is implemented at the point where session activity can be determined and/or controlled.

```
---
V-71901:
Old:
```
A session time-out lock is a temporary action taken when a user stops
work and moves away from the immediate physical vicinity of the information
system but does not log out because of the temporary nature of the absence.
Rather than relying on the user to manually lock their operating system session
prior to vacating the vicinity, operating systems need to be able to identify
when a user's session has idled and take action to initiate the session lock.

    The session lock is implemented at the point where session activity can be
determined and/or controlled.

```
New:
```
A session time-out lock is a temporary action taken when a user stops work and moves away from the immediate physical vicinity of the information system but does not log out because of the temporary nature of the absence. Rather than relying on the user to manually lock their operating system session prior to vacating the vicinity, operating systems need to be able to identify when a user's session has idled and take action to initiate the session lock.

The session lock is implemented at the point where session activity can be determined and/or controlled.

```
---
V-71903:
Old:
```
Use of a complex password helps to increase the time and resources
required to compromise the password. Password complexity, or strength, is a
measure of the effectiveness of a password in resisting attempts at guessing
and brute-force attacks.

    Password complexity is one factor of several that determines how long it
takes to crack a password. The more complex the password, the greater the
number of possible combinations that need to be tested before the password is
compromised.

```
New:
```
Use of a complex password helps to increase the time and resources required to compromise the password. Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks.

Password complexity is one factor of several that determines how long it takes to crack a password. The more complex the password, the greater the number of possible combinations that need to be tested before the password is compromised.

```
---
V-71905:
Old:
```
Use of a complex password helps to increase the time and resources
required to compromise the password. Password complexity, or strength, is a
measure of the effectiveness of a password in resisting attempts at guessing
and brute-force attacks.

    Password complexity is one factor of several that determines how long it
takes to crack a password. The more complex the password, the greater the
number of possible combinations that need to be tested before the password is
compromised.

```
New:
```
Use of a complex password helps to increase the time and resources required to compromise the password. Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks.

Password complexity is one factor of several that determines how long it takes to crack a password. The more complex the password, the greater the number of possible combinations that need to be tested before the password is compromised.

```
---
V-71907:
Old:
```
Use of a complex password helps to increase the time and resources
required to compromise the password. Password complexity, or strength, is a
measure of the effectiveness of a password in resisting attempts at guessing
and brute-force attacks.

    Password complexity is one factor of several that determines how long it
takes to crack a password. The more complex the password, the greater the
number of possible combinations that need to be tested before the password is
compromised.

```
New:
```
Use of a complex password helps to increase the time and resources required to compromise the password. Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks.

Password complexity is one factor of several that determines how long it takes to crack a password. The more complex the password, the greater the number of possible combinations that need to be tested before the password is compromised.

```
---
V-71909:
Old:
```
Use of a complex password helps to increase the time and resources
required to compromise the password. Password complexity, or strength, is a
measure of the effectiveness of a password in resisting attempts at guessing
and brute-force attacks.

    Password complexity is one factor of several that determines how long it
takes to crack a password. The more complex the password, the greater the
number of possible combinations that need to be tested before the password is
compromised.

```
New:
```
Use of a complex password helps to increase the time and resources required to compromise the password. Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks.

Password complexity is one factor of several that determines how long it takes to crack a password. The more complex the password, the greater the number of possible combinations that need to be tested before the password is compromised.

```
---
V-71911:
Old:
```
Use of a complex password helps to increase the time and resources
required to compromise the password. Password complexity, or strength, is a
measure of the effectiveness of a password in resisting attempts at guessing
and brute-force attacks.

    Password complexity is one factor of several that determines how long it
takes to crack a password. The more complex the password, the greater the
number of possible combinations that need to be tested before the password is
compromised.

```
New:
```
Use of a complex password helps to increase the time and resources required to compromise the password. Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks.

Password complexity is one factor of several that determines how long it takes to crack a password. The more complex the password, the greater the number of possible combinations that need to be tested before the password is compromised.

```
---
V-71913:
Old:
```
Use of a complex password helps to increase the time and resources
required to compromise the password. Password complexity, or strength, is a
measure of the effectiveness of a password in resisting attempts at guessing
and brute-force attacks.

    Password complexity is one factor of several that determines how long it
takes to crack a password. The more complex the password, the greater the
number of possible combinations that need to be tested before the password is
compromised.

```
New:
```
Use of a complex password helps to increase the time and resources required to compromise the password. Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks.

Password complexity is one factor of several that determines how long it takes to crack a password. The more complex the password, the greater the number of possible combinations that need to be tested before the password is compromised.

```
---
V-71915:
Old:
```
Use of a complex password helps to increase the time and resources
required to compromise the password. Password complexity, or strength, is a
measure of the effectiveness of a password in resisting attempts at guessing
and brute-force attacks.

    Password complexity is one factor of several that determines how long it
takes to crack a password. The more complex the password, the greater the
number of possible combinations that need to be tested before the password is
compromised.

```
New:
```
Use of a complex password helps to increase the time and resources required to compromise the password. Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks.

Password complexity is one factor of several that determines how long it takes to crack a password. The more complex the password, the greater the number of possible combinations that need to be tested before the password is compromised.

```
---
V-71917:
Old:
```
Use of a complex password helps to increase the time and resources
required to compromise the password. Password complexity, or strength, is a
measure of the effectiveness of a password in resisting attempts at guessing
and brute-force attacks.

    Password complexity is one factor of several that determines how long it
takes to crack a password. The more complex the password, the greater the
number of possible combinations that need to be tested before the password is
compromised.

```
New:
```
Use of a complex password helps to increase the time and resources required to compromise the password. Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks.

Password complexity is one factor of several that determines how long it takes to crack a password. The more complex the password, the greater the number of possible combinations that need to be tested before the password is compromised.

```
---
V-71919:
Old:
```
Passwords need to be protected at all times, and encryption is the
standard method for protecting passwords. If passwords are not encrypted, they
can be plainly read (i.e., clear text) and easily compromised. Passwords
encrypted with a weak algorithm are no more protected than if they are kept in
plain text.

```
New:
```
Passwords need to be protected at all times, and encryption is the standard method for protecting passwords. If passwords are not encrypted, they can be plainly read (i.e., clear text) and easily compromised. Passwords encrypted with a weak algorithm are no more protected than if they are kept in plain text.

```
---
V-71921:
Old:
```
Passwords need to be protected at all times, and encryption is the
standard method for protecting passwords. If passwords are not encrypted, they
can be plainly read (i.e., clear text) and easily compromised. Passwords
encrypted with a weak algorithm are no more protected than if they are kept in
plain text.

```
New:
```
Passwords need to be protected at all times, and encryption is the standard method for protecting passwords. If passwords are not encrypted, they can be plainly read (i.e., clear text) and easily compromised. Passwords encrypted with a weak algorithm are no more protected than if they are kept in plain text.

```
---
V-71923:
Old:
```
Passwords need to be protected at all times, and encryption is the
standard method for protecting passwords. If passwords are not encrypted, they
can be plainly read (i.e., clear text) and easily compromised. Passwords
encrypted with a weak algorithm are no more protected than if they are kept in
plain text.

```
New:
```
Passwords need to be protected at all times, and encryption is the standard method for protecting passwords. If passwords are not encrypted, they can be plainly read (i.e., clear text) and easily compromised. Passwords encrypted with a weak algorithm are no more protected than if they are kept in plain text.

```
---
V-71925:
Old:
```
Enforcing a minimum password lifetime helps to prevent repeated
password changes to defeat the password reuse or history enforcement
requirement. If users are allowed to immediately and continually change their
password, the password could be repeatedly changed in a short period of time to
defeat the organization's policy regarding password reuse.

```
New:
```
Enforcing a minimum password lifetime helps to prevent repeated password changes to defeat the password reuse or history enforcement requirement. If users are allowed to immediately and continually change their password, the password could be repeatedly changed in a short period of time to defeat the organization's policy regarding password reuse.

```
---
V-71927:
Old:
```
Enforcing a minimum password lifetime helps to prevent repeated
password changes to defeat the password reuse or history enforcement
requirement. If users are allowed to immediately and continually change their
password, the password could be repeatedly changed in a short period of time to
defeat the organization's policy regarding password reuse.

```
New:
```
Enforcing a minimum password lifetime helps to prevent repeated password changes to defeat the password reuse or history enforcement requirement. If users are allowed to immediately and continually change their password, the password could be repeatedly changed in a short period of time to defeat the organization's policy regarding password reuse.

```
---
V-71929:
Old:
```
Any password, no matter how complex, can eventually be cracked.
Therefore, passwords need to be changed periodically. If the operating system
does not limit the lifetime of passwords and force users to change their
passwords, there is the risk that the operating system passwords could be
compromised.

```
New:
```
Any password, no matter how complex, can eventually be cracked. Therefore, passwords need to be changed periodically. If the operating system does not limit the lifetime of passwords and force users to change their passwords, there is the risk that the operating system passwords could be compromised.

```
---
V-71931:
Old:
```
Any password, no matter how complex, can eventually be cracked.
Therefore, passwords need to be changed periodically. If the operating system
does not limit the lifetime of passwords and force users to change their
passwords, there is the risk that the operating system passwords could be
compromised.

```
New:
```
Any password, no matter how complex, can eventually be cracked. Therefore, passwords need to be changed periodically. If the operating system does not limit the lifetime of passwords and force users to change their passwords, there is the risk that the operating system passwords could be compromised.

```
---
V-71933:
Old:
```
Password complexity, or strength, is a measure of the effectiveness of
a password in resisting attempts at guessing and brute-force attacks. If the
information system or application allows the user to consecutively reuse their
password when that password has exceeded its defined lifetime, the end result
is a password that is not changed per policy requirements.

```
New:
```
Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks. If the information system or application allows the user to consecutively reuse their password when that password has exceeded its defined lifetime, the end result is a password that is not changed per policy requirements.

```
---
V-71935:
Old:
```
The shorter the password, the lower the number of possible
combinations that need to be tested before the password is compromised.

    Password complexity, or strength, is a measure of the effectiveness of a
password in resisting attempts at guessing and brute-force attacks. Password
length is one factor of several that helps to determine strength and how long
it takes to crack a password. Use of more characters in a password helps to
exponentially increase the time and/or resources required to compromise the
password.

```
New:
```
The shorter the password, the lower the number of possible combinations that need to be tested before the password is compromised.

Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks. Password length is one factor of several that helps to determine strength and how long it takes to crack a password. Use of more characters in a password helps to exponentially increase the time and/or resources required to compromise the password.

```
---
V-71937:
Old:
```
If an account has an empty password, anyone could log on and run
commands with the privileges of that account. Accounts with empty passwords
should never be used in operational environments.

```
New:
```
If an account has an empty password, anyone could log on and run commands with the privileges of that account. Accounts with empty passwords should never be used in operational environments.

```
---
V-71939:
Old:
```
Configuring this setting for the SSH daemon provides additional
assurance that remote logon via SSH will require a password, even in the event
of misconfiguration elsewhere.

```
New:
```
Configuring this setting for the SSH daemon provides additional assurance that remote logon via SSH will require a password, even in the event of misconfiguration elsewhere.

```
---
V-71941:
Old:
```
Inactive identifiers pose a risk to systems and applications because
attackers may exploit an inactive identifier and potentially obtain undetected
access to the system. Owners of inactive accounts will not notice if
unauthorized access to their user account has been obtained.

    Operating systems need to track periods of inactivity and disable
application identifiers after zero days of inactivity.

```
New:
```
Inactive identifiers pose a risk to systems and applications because attackers may exploit an inactive identifier and potentially obtain undetected access to the system. Owners of inactive accounts will not notice if unauthorized access to their user account has been obtained.

Operating systems need to track periods of inactivity and disable application identifiers after zero days of inactivity.

```
---
V-71943:
Old:
```
By limiting the number of failed logon attempts, the risk of
unauthorized system access via user password guessing, otherwise known as
brute-forcing, is reduced. Limits are imposed by locking the account.

```
New:
```
By limiting the number of failed logon attempts, the risk of unauthorized system access via user password guessing, otherwise known as brute-forcing, is reduced. Limits are imposed by locking the account.



```
---
V-71945:
Old:
```
By limiting the number of failed logon attempts, the risk of
unauthorized system access via user password guessing, otherwise known as brute
forcing, is reduced. Limits are imposed by locking the account.

```
New:
```
By limiting the number of failed logon attempts, the risk of unauthorized system access via user password guessing, otherwise known as brute forcing, is reduced. Limits are imposed by locking the account.



```
---
V-71947:
Old:
```
Without re-authentication, users may access resources or perform tasks
for which they do not have authorization.

    When operating systems provide the capability to escalate a functional
capability, it is critical the user re-authenticate.

```
New:
```
Without re-authentication, users may access resources or perform tasks for which they do not have authorization. 

When operating systems provide the capability to escalate a functional capability, it is critical the user re-authenticate.



```
---
V-71949:
Old:
```
Without re-authentication, users may access resources or perform tasks
for which they do not have authorization.

    When operating systems provide the capability to escalate a functional
capability, it is critical the user reauthenticate.

```
New:
```
Without re-authentication, users may access resources or perform tasks for which they do not have authorization. 

When operating systems provide the capability to escalate a functional capability, it is critical the user reauthenticate.



```
---
V-71951:
Old:
```
Configuring the operating system to implement organization-wide
security implementation guides and security checklists verifies compliance with
federal standards and establishes a common security baseline across DoD that
reflects the most restrictive security posture consistent with operational
requirements.

    Configuration settings are the set of parameters that can be changed in
hardware, software, or firmware components of the system that affect the
security posture and/or functionality of the system. Security-related
parameters are those parameters impacting the security state of the system,
including the parameters required to satisfy other security control
requirements. Security-related parameters include, for example, registry
settings; account, file, and directory permission settings; and settings for
functions, ports, protocols, services, and remote connections.

```
New:
```
Configuring the operating system to implement organization-wide security implementation guides and security checklists verifies compliance with federal standards and establishes a common security baseline across DoD that reflects the most restrictive security posture consistent with operational requirements.

Configuration settings are the set of parameters that can be changed in hardware, software, or firmware components of the system that affect the security posture and/or functionality of the system. Security-related parameters are those parameters impacting the security state of the system, including the parameters required to satisfy other security control requirements. Security-related parameters include, for example, registry settings; account, file, and directory permission settings; and settings for functions, ports, protocols, services, and remote connections.

```
---
V-71953:
Old:
```
Failure to restrict system access to authenticated users negatively
impacts operating system security.

```
New:
```
Failure to restrict system access to authenticated users negatively impacts operating system security.

```
---
V-71955:
Old:
```
Failure to restrict system access to authenticated users negatively
impacts operating system security.

```
New:
```
Failure to restrict system access to authenticated users negatively impacts operating system security.

```
---
V-71957:
Old:
```
Failure to restrict system access to authenticated users negatively
impacts operating system security.

```
New:
```
Failure to restrict system access to authenticated users negatively impacts operating system security.

```
---
V-71959:
Old:
```
Failure to restrict system access to authenticated users negatively
impacts operating system security.

```
New:
```
Failure to restrict system access to authenticated users negatively impacts operating system security.

```
---
V-71961:
Old:
```
If the system does not require valid root authentication before it
boots into single-user or maintenance mode, anyone who invokes single-user or
maintenance mode is granted privileged access to all files on the system. GRUB
2 is the default boot loader for RHEL 7 and is designed to require a password
to boot into single-user mode or make modifications to the boot menu.

```
New:
```
If the system does not require valid root authentication before it boots into single-user or maintenance mode, anyone who invokes single-user or maintenance mode is granted privileged access to all files on the system. GRUB 2 is the default boot loader for RHEL 7 and is designed to require a password to boot into single-user mode or make modifications to the boot menu.

```
---
V-71963:
Old:
```
If the system does not require valid root authentication before it
boots into single-user or maintenance mode, anyone who invokes single-user or
maintenance mode is granted privileged access to all files on the system. GRUB
2 is the default boot loader for RHEL 7 and is designed to require a password
to boot into single-user mode or make modifications to the boot menu.

```
New:
```
If the system does not require valid root authentication before it boots into single-user or maintenance mode, anyone who invokes single-user or maintenance mode is granted privileged access to all files on the system. GRUB 2 is the default boot loader for RHEL 7 and is designed to require a password to boot into single-user mode or make modifications to the boot menu.

```
---
V-71965:
Old:
```
To assure accountability and prevent unauthenticated access,
organizational users must be identified and authenticated to prevent potential
misuse and compromise of the system.

    Organizational users include organizational employees or individuals the
organization deems to have equivalent status of employees (e.g., contractors).
Organizational users (and processes acting on behalf of users) must be uniquely
identified and authenticated to all accesses, except for the following:

    1) Accesses explicitly identified and documented by the organization.
Organizations document specific user actions that can be performed on the
information system without identification or authentication;

    and

    2) Accesses that occur through authorized use of group authenticators
without individual authentication. Organizations may require unique
identification of individuals in group accounts (e.g., shared privilege
accounts) or for detailed accountability of individual activity.

```
New:
```
To assure accountability and prevent unauthenticated access, organizational users must be identified and authenticated to prevent potential misuse and compromise of the system.

Organizational users include organizational employees or individuals the organization deems to have equivalent status of employees (e.g., contractors). Organizational users (and processes acting on behalf of users) must be uniquely identified and authenticated to all accesses, except for the following:

1) Accesses explicitly identified and documented by the organization. Organizations document specific user actions that can be performed on the information system without identification or authentication; 

and

2) Accesses that occur through authorized use of group authenticators without individual authentication. Organizations may require unique identification of individuals in group accounts (e.g., shared privilege accounts) or for detailed accountability of individual activity.



```
---
V-71967:
Old:
```
It is detrimental for operating systems to provide, or install by
default, functionality exceeding requirements or mission objectives. These
unnecessary capabilities or services are often overlooked and therefore may
remain unsecured. They increase the risk to the platform by providing
additional attack vectors.

    Operating systems are capable of providing a wide variety of functions and
services. Some of the functions and services, provided by default, may not be
necessary to support essential organizational operations (e.g., key missions,
functions).

    The rsh-server service provides an unencrypted remote access service that
does not provide for the confidentiality and integrity of user passwords or the
remote session and has very weak authentication.

    If a privileged user were to log on using this service, the privileged user
password could be compromised.

```
New:
```
It is detrimental for operating systems to provide, or install by default, functionality exceeding requirements or mission objectives. These unnecessary capabilities or services are often overlooked and therefore may remain unsecured. They increase the risk to the platform by providing additional attack vectors.

Operating systems are capable of providing a wide variety of functions and services. Some of the functions and services, provided by default, may not be necessary to support essential organizational operations (e.g., key missions, functions).

The rsh-server service provides an unencrypted remote access service that does not provide for the confidentiality and integrity of user passwords or the remote session and has very weak authentication.

If a privileged user were to log on using this service, the privileged user password could be compromised.

```
---
V-71969:
Old:
```
Removing the "ypserv" package decreases the risk of the accidental
(or intentional) activation of NIS or NIS+ services.

```
New:
```
Removing the "ypserv" package decreases the risk of the accidental (or intentional) activation of NIS or NIS+ services.

```
---
V-71971:
Old:
```
Preventing non-privileged users from executing privileged functions
mitigates the risk that unauthorized individuals or processes may gain
unnecessary access to information or privileges.

    Privileged functions include, for example, establishing accounts,
performing system integrity checks, or administering cryptographic key
management activities. Non-privileged users are individuals who do not possess
appropriate authorizations. Circumventing intrusion detection and prevention
mechanisms or malicious code protection mechanisms are examples of privileged
functions that require protection from non-privileged users.

```
New:
```
Preventing non-privileged users from executing privileged functions mitigates the risk that unauthorized individuals or processes may gain unnecessary access to information or privileges.

Privileged functions include, for example, establishing accounts, performing system integrity checks, or administering cryptographic key management activities. Non-privileged users are individuals who do not possess appropriate authorizations. Circumventing intrusion detection and prevention mechanisms or malicious code protection mechanisms are examples of privileged functions that require protection from non-privileged users.

```
---
V-71973:
Old:
```
Unauthorized changes to the baseline configuration could make the
system vulnerable to various attacks or allow unauthorized access to the
operating system. Changes to operating system configurations can have
unintended side effects, some of which may be relevant to security.

    Detecting such changes and providing an automated response can help avoid
unintended, negative consequences that could ultimately affect the security
state of the operating system. The operating system's Information Management
Officer (IMO)/Information System Security Officer (ISSO) and System
Administrators (SAs) must be notified via email and/or monitoring system trap
when there is an unauthorized modification of a configuration item.

```
New:
```
Unauthorized changes to the baseline configuration could make the system vulnerable to various attacks or allow unauthorized access to the operating system. Changes to operating system configurations can have unintended side effects, some of which may be relevant to security.

Detecting such changes and providing an automated response can help avoid unintended, negative consequences that could ultimately affect the security state of the operating system. The operating system's Information Management Officer (IMO)/Information System Security Officer (ISSO) and System Administrators (SAs) must be notified via email and/or monitoring system trap when there is an unauthorized modification of a configuration item.

```
---
V-71975:
Old:
```
Unauthorized changes to the baseline configuration could make the
system vulnerable to various attacks or allow unauthorized access to the
operating system. Changes to operating system configurations can have
unintended side effects, some of which may be relevant to security.

    Detecting such changes and providing an automated response can help avoid
unintended, negative consequences that could ultimately affect the security
state of the operating system. The operating system's Information Management
Officer (IMO)/Information System Security Officer (ISSO) and System
Administrators (SAs) must be notified via email and/or monitoring system trap
when there is an unauthorized modification of a configuration item.

```
New:
```
Unauthorized changes to the baseline configuration could make the system vulnerable to various attacks or allow unauthorized access to the operating system. Changes to operating system configurations can have unintended side effects, some of which may be relevant to security.

Detecting such changes and providing an automated response can help avoid unintended, negative consequences that could ultimately affect the security state of the operating system. The operating system's Information Management Officer (IMO)/Information System Security Officer (ISSO) and System Administrators (SAs) must be notified via email and/or monitoring system trap when there is an unauthorized modification of a configuration item.

```
---
V-71977:
Old:
```
Changes to any software components can have significant effects on the
overall security of the operating system. This requirement ensures the software
has not been tampered with and that it has been provided by a trusted vendor.

    Accordingly, patches, service packs, device drivers, or operating system
components must be signed with a certificate recognized and approved by the
organization.

    Verifying the authenticity of the software prior to installation validates
the integrity of the patch or upgrade received from a vendor. This verifies the
software has not been tampered with and that it has been provided by a trusted
vendor. Self-signed certificates are disallowed by this requirement. The
operating system should not have to verify the software again. This requirement
does not mandate DoD certificates for this purpose; however, the certificate
used to verify the software must be from an approved CA.

```
New:
```
Changes to any software components can have significant effects on the overall security of the operating system. This requirement ensures the software has not been tampered with and that it has been provided by a trusted vendor.

Accordingly, patches, service packs, device drivers, or operating system components must be signed with a certificate recognized and approved by the organization.

Verifying the authenticity of the software prior to installation validates the integrity of the patch or upgrade received from a vendor. This verifies the software has not been tampered with and that it has been provided by a trusted vendor. Self-signed certificates are disallowed by this requirement. The operating system should not have to verify the software again. This requirement does not mandate DoD certificates for this purpose; however, the certificate used to verify the software must be from an approved CA.

```
---
V-71979:
Old:
```
Changes to any software components can have significant effects on the
overall security of the operating system. This requirement ensures the software
has not been tampered with and that it has been provided by a trusted vendor.

    Accordingly, patches, service packs, device drivers, or operating system
components must be signed with a certificate recognized and approved by the
organization.

    Verifying the authenticity of the software prior to installation validates
the integrity of the patch or upgrade received from a vendor. This verifies the
software has not been tampered with and that it has been provided by a trusted
vendor. Self-signed certificates are disallowed by this requirement. The
operating system should not have to verify the software again. This requirement
does not mandate DoD certificates for this purpose; however, the certificate
used to verify the software must be from an approved CA.

```
New:
```
Changes to any software components can have significant effects on the overall security of the operating system. This requirement ensures the software has not been tampered with and that it has been provided by a trusted vendor.

Accordingly, patches, service packs, device drivers, or operating system components must be signed with a certificate recognized and approved by the organization.

Verifying the authenticity of the software prior to installation validates the integrity of the patch or upgrade received from a vendor. This verifies the software has not been tampered with and that it has been provided by a trusted vendor. Self-signed certificates are disallowed by this requirement. The operating system should not have to verify the software again. This requirement does not mandate DoD certificates for this purpose; however, the certificate used to verify the software must be from an approved CA.

```
---
V-71983:
Old:
```
USB mass storage permits easy introduction of unknown devices, thereby
facilitating malicious activity.

```
New:
```
USB mass storage permits easy introduction of unknown devices, thereby facilitating malicious activity.



```
---
V-71985:
Old:
```
Automatically mounting file systems permits easy introduction of
unknown devices, thereby facilitating malicious activity.

```
New:
```
Automatically mounting file systems permits easy introduction of unknown devices, thereby facilitating malicious activity.



```
---
V-71987:
Old:
```
Previous versions of software components that are not removed from the
information system after updates have been installed may be exploited by
adversaries. Some information technology products may remove older versions of
software automatically from the information system.

```
New:
```
Previous versions of software components that are not removed from the information system after updates have been installed may be exploited by adversaries. Some information technology products may remove older versions of software automatically from the information system.

```
---
V-71989:
Old:
```
Without verification of the security functions, security functions may
not operate correctly and the failure may go unnoticed. Security function is
defined as the hardware, software, and/or firmware of the information system
responsible for enforcing the system security policy and supporting the
isolation of code and data on which the protection is based. Security
functionality includes, but is not limited to, establishing system accounts,
configuring access authorizations (i.e., permissions, privileges), setting
events to be audited, and setting intrusion detection parameters.

    This requirement applies to operating systems performing security function
verification/testing and/or systems and environments that require this
functionality.

```
New:
```
Without verification of the security functions, security functions may not operate correctly and the failure may go unnoticed. Security function is defined as the hardware, software, and/or firmware of the information system responsible for enforcing the system security policy and supporting the isolation of code and data on which the protection is based. Security functionality includes, but is not limited to, establishing system accounts, configuring access authorizations (i.e., permissions, privileges), setting events to be audited, and setting intrusion detection parameters.

This requirement applies to operating systems performing security function verification/testing and/or systems and environments that require this functionality.

```
---
V-71991:
Old:
```
Without verification of the security functions, security functions may
not operate correctly and the failure may go unnoticed. Security function is
defined as the hardware, software, and/or firmware of the information system
responsible for enforcing the system security policy and supporting the
isolation of code and data on which the protection is based. Security
functionality includes, but is not limited to, establishing system accounts,
configuring access authorizations (i.e., permissions, privileges), setting
events to be audited, and setting intrusion detection parameters.

    This requirement applies to operating systems performing security function
verification/testing and/or systems and environments that require this
functionality.

```
New:
```
Without verification of the security functions, security functions may not operate correctly and the failure may go unnoticed. Security function is defined as the hardware, software, and/or firmware of the information system responsible for enforcing the system security policy and supporting the isolation of code and data on which the protection is based. Security functionality includes, but is not limited to, establishing system accounts, configuring access authorizations (i.e., permissions, privileges), setting events to be audited, and setting intrusion detection parameters.

This requirement applies to operating systems performing security function verification/testing and/or systems and environments that require this functionality.

```
---
V-71993:
Old:
```
A locally logged-on user who presses Ctrl-Alt-Delete, when at the
console, can reboot the system. If accidentally pressed, as could happen in the
case of a mixed OS environment, this can create the risk of short-term loss of
availability of systems due to unintentional reboot. In the GNOME graphical
environment, risk of unintentional reboot from the Ctrl-Alt-Delete sequence is
reduced because the user will be prompted before any action is taken.

```
New:
```
A locally logged-on user who presses Ctrl-Alt-Delete, when at the console, can reboot the system. If accidentally pressed, as could happen in the case of a mixed OS environment, this can create the risk of short-term loss of availability of systems due to unintentional reboot. In the GNOME graphical environment, risk of unintentional reboot from the Ctrl-Alt-Delete sequence is reduced because the user will be prompted before any action is taken.

```
---
V-71995:
Old:
```
Setting the most restrictive default permissions ensures that when new
accounts are created, they do not have unnecessary access.

```
New:
```
Setting the most restrictive default permissions ensures that when new accounts are created, they do not have unnecessary access.

```
---
V-71997:
Old:
```
An operating system release is considered "supported" if the vendor
continues to provide security patches for the product. With an unsupported
release, it will not be possible to resolve security issues discovered in the
system software.

```
New:
```
An operating system release is considered "supported" if the vendor continues to provide security patches for the product. With an unsupported release, it will not be possible to resolve security issues discovered in the system software.

```
---
V-71999:
Old:
```
Timely patching is critical for maintaining the operational
        availability, confidentiality, and integrity of information technology (IT)
        systems. However, failure to keep operating system and application software
        patched is a common mistake made by IT professionals. New patches are released
        daily, and it is often difficult for even experienced System Administrators to
        keep abreast of all the new patches. When new weaknesses in an operating system
        exist, patches are usually made available by the vendor to resolve the
        problems. If the most recent security patches and updates are not installed,
        unauthorized users may take advantage of weaknesses in the unpatched software.
        The lack of prompt attention to patching could result in a system compromise.

```
New:
```
Timely patching is critical for maintaining the operational availability, confidentiality, and integrity of information technology (IT) systems. However, failure to keep operating system and application software patched is a common mistake made by IT professionals. New patches are released daily, and it is often difficult for even experienced System Administrators to keep abreast of all the new patches. When new weaknesses in an operating system exist, patches are usually made available by the vendor to resolve the problems. If the most recent security patches and updates are not installed, unauthorized users may take advantage of weaknesses in the unpatched software. The lack of prompt attention to patching could result in a system compromise.

```
---
V-72001:
Old:
```
Accounts providing no operational purpose provide additional
opportunities for system compromise. Unnecessary accounts include user accounts
for individuals not requiring access to the system and application accounts for
applications not installed on the system.

```
New:
```
Accounts providing no operational purpose provide additional opportunities for system compromise. Unnecessary accounts include user accounts for individuals not requiring access to the system and application accounts for applications not installed on the system.

```
---
V-72003:
Old:
```
If a user is assigned the GID of a group not existing on the system,
and a group with the GID is subsequently created, the user may have unintended
rights to any files associated with the group.

```
New:
```
If a user is assigned the GID of a group not existing on the system, and a group with the GID is subsequently created, the user may have unintended rights to any files associated with the group.

```
---
V-72005:
Old:
```
If an account other than root also has a User Identifier (UID) of
"0", it has root authority, giving that account unrestricted access to the
entire operating system. Multiple accounts with a UID of "0" afford an
opportunity for potential intruders to guess a password for a privileged
account.

```
New:
```
If an account other than root also has a User Identifier (UID) of "0", it has root authority, giving that account unrestricted access to the entire operating system. Multiple accounts with a UID of "0" afford an opportunity for potential intruders to guess a password for a privileged account.

```
---
V-72007:
Old:
```
Unowned files and directories may be unintentionally inherited if a
user is assigned the same User Identifier "UID" as the UID of the un-owned
files.

```
New:
```
Unowned files and directories may be unintentionally inherited if a user is assigned the same User Identifier "UID" as the UID of the un-owned files.

```
---
V-72009:
Old:
```
Files without a valid group owner may be unintentionally inherited if
a group is assigned the same Group Identifier (GID) as the GID of the files
without a valid group owner.

```
New:
```
Files without a valid group owner may be unintentionally inherited if a group is assigned the same Group Identifier (GID) as the GID of the files without a valid group owner.

```
---
V-72011:
Old:
```
If local interactive users are not assigned a valid home directory,
there is no place for the storage and control of files they should own.

```
New:
```
If local interactive users are not assigned a valid home directory, there is no place for the storage and control of files they should own.

```
---
V-72013:
Old:
```
If local interactive users are not assigned a valid home directory,
there is no place for the storage and control of files they should own.

```
New:
```
If local interactive users are not assigned a valid home directory, there is no place for the storage and control of files they should own.

```
---
V-72015:
Old:
```
If a local interactive user has a home directory defined that does not
exist, the user may be given access to the / directory as the current working
directory upon logon. This could create a Denial of Service because the user
would not be able to access their logon configuration files, and it may give
them visibility to system files they normally would not be able to access.

```
New:
```
If a local interactive user has a home directory defined that does not exist, the user may be given access to the / directory as the current working directory upon logon. This could create a Denial of Service because the user would not be able to access their logon configuration files, and it may give them visibility to system files they normally would not be able to access.

```
---
V-72017:
Old:
```
Excessive permissions on local interactive user home directories may
allow unauthorized access to user files by other users.

```
New:
```
Excessive permissions on local interactive user home directories may allow unauthorized access to user files by other users.

```
---
V-72019:
Old:
```
If a local interactive user does not own their home directory,
unauthorized users could access or modify the user's files, and the users may
not be able to access their own files.

```
New:
```
If a local interactive user does not own their home directory, unauthorized users could access or modify the user's files, and the users may not be able to access their own files.

```
---
V-72021:
Old:
```
If the Group Identifier (GID) of a local interactive user's home
directory is not the same as the primary GID of the user, this would allow
unauthorized access to the user's files, and users that share the same group
may not be able to access files that they legitimately should.

```
New:
```
If the Group Identifier (GID) of a local interactive user's home directory is not the same as the primary GID of the user, this would allow unauthorized access to the user's files, and users that share the same group may not be able to access files that they legitimately should.

```
---
V-72023:
Old:
```
If local interactive users do not own the files in their directories,
unauthorized users may be able to access them. Additionally, if files are not
owned by the user, this could be an indication of system compromise.

```
New:
```
If local interactive users do not own the files in their directories, unauthorized users may be able to access them. Additionally, if files are not owned by the user, this could be an indication of system compromise.

```
---
V-72025:
Old:
```
If a local interactive user's files are group-owned by a group of
which the user is not a member, unintended users may be able to access them.

```
New:
```
If a local interactive user's files are group-owned by a group of which the user is not a member, unintended users may be able to access them.

```
---
V-72027:
Old:
```
If a local interactive user files have excessive permissions,
unintended users may be able to access or modify them.

```
New:
```
If a local interactive user files have excessive permissions, unintended users may be able to access or modify them.

```
---
V-72029:
Old:
```
Local initialization files are used to configure the user's shell
environment upon logon. Malicious modification of these files could compromise
accounts upon logon.

```
New:
```
Local initialization files are used to configure the user's shell environment upon logon. Malicious modification of these files could compromise accounts upon logon.

```
---
V-72031:
Old:
```
Local initialization files for interactive users are used to configure
the user's shell environment upon logon. Malicious modification of these files
could compromise accounts upon logon.

```
New:
```
Local initialization files for interactive users are used to configure the user's shell environment upon logon. Malicious modification of these files could compromise accounts upon logon.

```
---
V-72033:
Old:
```
Local initialization files are used to configure the user's shell
environment upon logon. Malicious modification of these files could compromise
accounts upon logon.

```
New:
```
Local initialization files are used to configure the user's shell environment upon logon. Malicious modification of these files could compromise accounts upon logon.

```
---
V-72035:
Old:
```
The executable search path (typically the PATH environment variable)
contains a list of directories for the shell to search to find executables. If
this path includes the current working directory (other than the user's home
directory), executables in these directories may be executed instead of system
commands. This variable is formatted as a colon-separated list of directories.
If there is an empty entry, such as a leading or trailing colon or two
consecutive colons, this is interpreted as the current working directory. If
deviations from the default system search path for the local interactive user
are required, they must be documented with the Information System Security
Officer (ISSO).

```
New:
```
The executable search path (typically the PATH environment variable) contains a list of directories for the shell to search to find executables. If this path includes the current working directory (other than the user's home directory), executables in these directories may be executed instead of system commands. This variable is formatted as a colon-separated list of directories. If there is an empty entry, such as a leading or trailing colon or two consecutive colons, this is interpreted as the current working directory. If deviations from the default system search path for the local interactive user are required, they must be documented with the Information System Security Officer (ISSO).

```
---
V-72037:
Old:
```
If user start-up files execute world-writable programs, especially in
unprotected directories, they could be maliciously modified to destroy user
files or otherwise compromise the system at the user level. If the system is
compromised at the user level, it is easier to elevate privileges to eventually
compromise the system at the root and network level.

```
New:
```
If user start-up files execute world-writable programs, especially in unprotected directories, they could be maliciously modified to destroy user files or otherwise compromise the system at the user level. If the system is compromised at the user level, it is easier to elevate privileges to eventually compromise the system at the root and network level.

```
---
V-72039:
Old:
```
If an unauthorized or modified device is allowed to exist on the
system, there is the possibility the system may perform unintended or
unauthorized operations.

```
New:
```
If an unauthorized or modified device is allowed to exist on the system, there is the possibility the system may perform unintended or unauthorized operations.

```
---
V-72041:
Old:
```
The "nosuid" mount option causes the system to not execute setuid
and setgid files with owner privileges. This option must be used for mounting
any file system not containing approved setuid and setguid files. Executing
files from untrusted file systems increases the opportunity for unprivileged
users to attain unauthorized administrative access.

```
New:
```
The "nosuid" mount option causes the system to not execute setuid and setgid files with owner privileges. This option must be used for mounting any file system not containing approved setuid and setguid files. Executing files from untrusted file systems increases the opportunity for unprivileged users to attain unauthorized administrative access.

```
---
V-72043:
Old:
```
The "nosuid" mount option causes the system to not execute
"setuid" and "setgid" files with owner privileges. This option must be used
for mounting any file system not containing approved "setuid" and "setguid"
files. Executing files from untrusted file systems increases the opportunity
for unprivileged users to attain unauthorized administrative access.

```
New:
```
The "nosuid" mount option causes the system to not execute "setuid" and "setgid" files with owner privileges. This option must be used for mounting any file system not containing approved "setuid" and "setguid" files. Executing files from untrusted file systems increases the opportunity for unprivileged users to attain unauthorized administrative access.

```
---
V-72045:
Old:
```
The "nosuid" mount option causes the system to not execute
"setuid" and "setgid" files with owner privileges. This option must be used
for mounting any file system not containing approved "setuid" and "setguid"
files. Executing files from untrusted file systems increases the opportunity
for unprivileged users to attain unauthorized administrative access.

```
New:
```
The "nosuid" mount option causes the system to not execute "setuid" and "setgid" files with owner privileges. This option must be used for mounting any file system not containing approved "setuid" and "setguid" files. Executing files from untrusted file systems increases the opportunity for unprivileged users to attain unauthorized administrative access.

```
---
V-72047:
Old:
```
If a world-writable directory has the sticky bit set and is not
group-owned by a privileged Group Identifier (GID), unauthorized users may be
able to modify files created by others.

    The only authorized public directories are those temporary directories
supplied with the system or those designed to be temporary file repositories.
The setting is normally reserved for directories used by the system and by
users for temporary file storage, (e.g., /tmp), and for directories requiring
global read/write access.

```
New:
```
If a world-writable directory has the sticky bit set and is not group-owned by a privileged Group Identifier (GID), unauthorized users may be able to modify files created by others.

The only authorized public directories are those temporary directories supplied with the system or those designed to be temporary file repositories. The setting is normally reserved for directories used by the system and by users for temporary file storage, (e.g., /tmp), and for directories requiring global read/write access.

```
---
V-72049:
Old:
```
The umask controls the default access mode assigned to newly created
files. A umask of 077 limits new files to mode 700 or less permissive. Although
umask can be represented as a four-digit number, the first digit representing
special access modes is typically ignored or required to be "0". This
requirement applies to the globally configured system defaults and the local
interactive user defaults for each account on the system.

```
New:
```
The umask controls the default access mode assigned to newly created files. A umask of 077 limits new files to mode 700 or less permissive. Although umask can be represented as a four-digit number, the first digit representing special access modes is typically ignored or required to be "0". This requirement applies to the globally configured system defaults and the local interactive user defaults for each account on the system.

```
---
V-72051:
Old:
```
Cron logging can be used to trace the successful or unsuccessful
execution of cron jobs. It can also be used to spot intrusions into the use of
the cron facility by unauthorized and malicious users.

```
New:
```
Cron logging can be used to trace the successful or unsuccessful execution of cron jobs. It can also be used to spot intrusions into the use of the cron facility by unauthorized and malicious users.

```
---
V-72053:
Old:
```
If the owner of the "cron.allow" file is not set to root, the
possibility exists for an unauthorized user to view or to edit sensitive
information.

```
New:
```
If the owner of the "cron.allow" file is not set to root, the possibility exists for an unauthorized user to view or to edit sensitive information.

```
---
V-72055:
Old:
```
If the group owner of the "cron.allow" file is not set to root,
sensitive information could be viewed or edited by unauthorized users.

```
New:
```
If the group owner of the "cron.allow" file is not set to root, sensitive information could be viewed or edited by unauthorized users.

```
---
V-72057:
Old:
```
Kernel core dumps may contain the full contents of system memory at
the time of the crash. Kernel core dumps may consume a considerable amount of
disk space and may result in denial of service by exhausting the available
space on the target file system partition.

```
New:
```
Kernel core dumps may contain the full contents of system memory at the time of the crash. Kernel core dumps may consume a considerable amount of disk space and may result in denial of service by exhausting the available space on the target file system partition.

```
---
V-72059:
Old:
```
The use of separate file systems for different paths can protect the
system from failures resulting from a file system becoming full or failing.

```
New:
```
The use of separate file systems for different paths can protect the system from failures resulting from a file system becoming full or failing.

```
---
V-72061:
Old:
```
The use of separate file systems for different paths can protect the
system from failures resulting from a file system becoming full or failing.

```
New:
```
The use of separate file systems for different paths can protect the system from failures resulting from a file system becoming full or failing.

```
---
V-72063:
Old:
```
The use of separate file systems for different paths can protect the
system from failures resulting from a file system becoming full or failing.

```
New:
```
The use of separate file systems for different paths can protect the system from failures resulting from a file system becoming full or failing.

```
---
V-72065:
Old:
```
The use of separate file systems for different paths can protect the
system from failures resulting from a file system becoming full or failing.

```
New:
```
The use of separate file systems for different paths can protect the system from failures resulting from a file system becoming full or failing.

```
---
V-72067:
Old:
```
Use of weak or untested encryption algorithms undermines the purposes
of using encryption to protect data. The operating system must implement
cryptographic modules adhering to the higher standards approved by the federal
government since this provides assurance they have been tested and validated.

```
New:
```
Use of weak or untested encryption algorithms undermines the purposes of using encryption to protect data. The operating system must implement cryptographic modules adhering to the higher standards approved by the federal government since this provides assurance they have been tested and validated.



```
---
V-72069:
Old:
```
ACLs can provide permissions beyond those permitted through the file
mode and must be verified by file integrity tools.

```
New:
```
ACLs can provide permissions beyond those permitted through the file mode and must be verified by file integrity tools.

```
---
V-72071:
Old:
```
Extended attributes in file systems are used to contain arbitrary data
and file metadata with security implications.

```
New:
```
Extended attributes in file systems are used to contain arbitrary data and file metadata with security implications.

```
---
V-72073:
Old:
```
File integrity tools use cryptographic hashes for verifying file
contents and directories have not been altered. These hashes must be FIPS 140-2
approved cryptographic hashes.

```
New:
```
File integrity tools use cryptographic hashes for verifying file contents and directories have not been altered. These hashes must be FIPS 140-2 approved cryptographic hashes.

```
---
V-72075:
Old:
```
Malicious users with removable boot media can gain access to a system
configured to use removable media as the boot loader. If removable media is
designed to be used as the boot loader, the requirement must be documented with
the Information System Security Officer (ISSO).

```
New:
```
Malicious users with removable boot media can gain access to a system configured to use removable media as the boot loader. If removable media is designed to be used as the boot loader, the requirement must be documented with the Information System Security Officer (ISSO).

```
---
V-72077:
Old:
```
It is detrimental for operating systems to provide, or install by
default, functionality exceeding requirements or mission objectives. These
unnecessary capabilities or services are often overlooked and therefore may
remain unsecured. They increase the risk to the platform by providing
additional attack vectors.

    Operating systems are capable of providing a wide variety of functions and
services. Some of the functions and services, provided by default, may not be
necessary to support essential organizational operations (e.g., key missions,
functions).

    Examples of non-essential capabilities include, but are not limited to,
games, software packages, tools, and demonstration software not related to
requirements or providing a wide array of functionality not required for every
mission, but which cannot be disabled.

```
New:
```
It is detrimental for operating systems to provide, or install by default, functionality exceeding requirements or mission objectives. These unnecessary capabilities or services are often overlooked and therefore may remain unsecured. They increase the risk to the platform by providing additional attack vectors.

Operating systems are capable of providing a wide variety of functions and services. Some of the functions and services, provided by default, may not be necessary to support essential organizational operations (e.g., key missions, functions).

Examples of non-essential capabilities include, but are not limited to, games, software packages, tools, and demonstration software not related to requirements or providing a wide array of functionality not required for every mission, but which cannot be disabled.

```
---
V-72079:
Old:
```
Without establishing what type of events occurred, it would be
difficult to establish, correlate, and investigate the events leading up to an
outage or attack.

    Audit record content that may be necessary to satisfy this requirement
includes, for example, time stamps, source and destination addresses,
user/process identifiers, event descriptions, success/fail indications,
filenames involved, and access control or flow control rules invoked.

    Associating event types with detected events in the operating system audit
logs provides a means of investigating an attack; recognizing resource
utilization or capacity thresholds; or identifying an improperly configured
operating system.

```
New:
```
Without establishing what type of events occurred, it would be difficult to establish, correlate, and investigate the events leading up to an outage or attack.

Audit record content that may be necessary to satisfy this requirement includes, for example, time stamps, source and destination addresses, user/process identifiers, event descriptions, success/fail indications, filenames involved, and access control or flow control rules invoked.

Associating event types with detected events in the operating system audit logs provides a means of investigating an attack; recognizing resource utilization or capacity thresholds; or identifying an improperly configured operating system.



```
---
V-72081:
Old:
```
It is critical for the appropriate personnel to be aware if a system
is at risk of failing to process audit logs as required. Without this
notification, the security personnel may be unaware of an impending failure of
the audit capability, and system operation may be adversely affected.

    Audit processing failures include software/hardware errors, failures in the
audit capturing mechanisms, and audit storage capacity being reached or
exceeded.

    This requirement applies to each audit data storage repository (i.e.,
distinct information system component where audit records are stored), the
centralized audit storage capacity of organizations (i.e., all audit data
storage repositories combined), or both.

```
New:
```
It is critical for the appropriate personnel to be aware if a system is at risk of failing to process audit logs as required. Without this notification, the security personnel may be unaware of an impending failure of the audit capability, and system operation may be adversely affected.

Audit processing failures include software/hardware errors, failures in the audit capturing mechanisms, and audit storage capacity being reached or exceeded.

This requirement applies to each audit data storage repository (i.e., distinct information system component where audit records are stored), the centralized audit storage capacity of organizations (i.e., all audit data storage repositories combined), or both.



```
---
V-72083:
Old:
```
Information stored in one location is vulnerable to accidental or
incidental deletion or alteration.

    Off-loading is a common process in information systems with limited audit
storage capacity.

```
New:
```
Information stored in one location is vulnerable to accidental or incidental deletion or alteration.

Off-loading is a common process in information systems with limited audit storage capacity.



```
---
V-72085:
Old:
```
Information stored in one location is vulnerable to accidental or
incidental deletion or alteration.

    Off-loading is a common process in information systems with limited audit
storage capacity.

```
New:
```
Information stored in one location is vulnerable to accidental or incidental deletion or alteration.

Off-loading is a common process in information systems with limited audit storage capacity.



```
---
V-72087:
Old:
```
Taking appropriate action in case of a filled audit storage volume
will minimize the possibility of losing audit records.

```
New:
```
Taking appropriate action in case of a filled audit storage volume will minimize the possibility of losing audit records.

```
---
V-72089:
Old:
```
If security personnel are not notified immediately when storage volume
reaches 75 percent utilization, they are unable to plan for audit record
storage capacity expansion.

```
New:
```
If security personnel are not notified immediately when storage volume reaches 75 percent utilization, they are unable to plan for audit record storage capacity expansion.

```
---
V-72091:
Old:
```
If security personnel are not notified immediately when the threshold
for the repository maximum audit record storage capacity is reached, they are
unable to expand the audit record storage capacity before records are lost.

```
New:
```
If security personnel are not notified immediately when the threshold for the repository maximum audit record storage capacity is reached, they are unable to expand the audit record storage capacity before records are lost.

```
---
V-72093:
Old:
```
If security personnel are not notified immediately when the threshold
for the repository maximum audit record storage capacity is reached, they are
unable to expand the audit record storage capacity before records are lost.

```
New:
```
If security personnel are not notified immediately when the threshold for the repository maximum audit record storage capacity is reached, they are unable to expand the audit record storage capacity before records are lost.

```
---
V-72095:
Old:
```
Misuse of privileged functions, either intentionally or
unintentionally by authorized users, or by unauthorized external entities that
have compromised information system accounts, is a serious and ongoing concern
and can have significant adverse impacts on organizations. Auditing the use of
privileged functions is one way to detect such misuse and identify the risk
from insider threats and the advanced persistent threat.

```
New:
```
Misuse of privileged functions, either intentionally or unintentionally by authorized users, or by unauthorized external entities that have compromised information system accounts, is a serious and ongoing concern and can have significant adverse impacts on organizations. Auditing the use of privileged functions is one way to detect such misuse and identify the risk from insider threats and the advanced persistent threat.

```
---
V-72097:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72099:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72101:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72103:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72105:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72107:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72109:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72111:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72113:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72115:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72117:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72119:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72121:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72123:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72125:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72127:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72129:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72131:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72133:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72135:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72137:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72139:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72141:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72145:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72147:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72149:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged password commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged password commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72151:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged password commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged password commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72153:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged password commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged password commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72155:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged password commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged password commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72157:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged password commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged password commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72159:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged access commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged access commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72161:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged access commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged access commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72163:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged access commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged access commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72165:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged access commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged access commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72167:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged access commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged access commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72171:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged mount commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged mount commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72173:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged mount commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged mount commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72175:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged postfix commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged postfix commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72177:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged postfix commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged postfix commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72179:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged ssh commands. The organization must maintain audit trails in
sufficient detail to reconstruct events to determine the cause and impact of
compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged ssh commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72183:
Old:
```
Reconstruction of harmful events or forensic analysis is not possible
if audit records do not contain enough information.

    At a minimum, the organization must audit the full-text recording of
privileged commands. The organization must maintain audit trails in sufficient
detail to reconstruct events to determine the cause and impact of compromise.

```
New:
```
Reconstruction of harmful events or forensic analysis is not possible if audit records do not contain enough information.

At a minimum, the organization must audit the full-text recording of privileged commands. The organization must maintain audit trails in sufficient detail to reconstruct events to determine the cause and impact of compromise.



```
---
V-72185:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

```
---
V-72187:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one. 

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72189:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one. 

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72191:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one. 

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72197:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-72199:
Old:
```
If the system is not configured to audit certain activities and write
them to an audit log, it is more difficult to detect and track system
compromises and damages incurred during a system compromise.

```
New:
```
If the system is not configured to audit certain activities and write them to an audit log, it is more difficult to detect and track system compromises and damages incurred during a system compromise.



```
---
V-72201:
Old:
```
If the system is not configured to audit certain activities and write
them to an audit log, it is more difficult to detect and track system
compromises and damages incurred during a system compromise.

```
New:
```
If the system is not configured to audit certain activities and write them to an audit log, it is more difficult to detect and track system compromises and damages incurred during a system compromise.



```
---
V-72203:
Old:
```
If the system is not configured to audit certain activities and write
them to an audit log, it is more difficult to detect and track system
compromises and damages incurred during a system compromise.

```
New:
```
If the system is not configured to audit certain activities and write them to an audit log, it is more difficult to detect and track system compromises and damages incurred during a system compromise.



```
---
V-72205:
Old:
```
If the system is not configured to audit certain activities and write
them to an audit log, it is more difficult to detect and track system
compromises and damages incurred during a system compromise.

```
New:
```
If the system is not configured to audit certain activities and write them to an audit log, it is more difficult to detect and track system compromises and damages incurred during a system compromise.



```
---
V-72207:
Old:
```
If the system is not configured to audit certain activities and write
them to an audit log, it is more difficult to detect and track system
compromises and damages incurred during a system compromise.

```
New:
```
If the system is not configured to audit certain activities and write them to an audit log, it is more difficult to detect and track system compromises and damages incurred during a system compromise.



```
---
V-72209:
Old:
```
Sending rsyslog output to another system ensures that the logs cannot
be removed or modified in the event that the system is compromised or has a
hardware failure.

```
New:
```
Sending rsyslog output to another system ensures that the logs cannot be removed or modified in the event that the system is compromised or has a hardware failure.

```
---
V-72211:
Old:
```
Unintentionally running a rsyslog server accepting remote messages
puts the system at increased risk. Malicious rsyslog messages sent to the
server could exploit vulnerabilities in the server software itself, could
introduce misleading information in to the system's logs, or could fill the
system's storage leading to a Denial of Service.

    If the system is intended to be a log aggregation server its use must be
documented with the ISSO.

```
New:
```
Unintentionally running a rsyslog server accepting remote messages puts the system at increased risk. Malicious rsyslog messages sent to the server could exploit vulnerabilities in the server software itself, could introduce misleading information in to the system's logs, or could fill the system's storage leading to a Denial of Service.

If the system is intended to be a log aggregation server its use must be documented with the ISSO.

```
---
V-72213:
Old:
```
Virus scanning software can be used to protect a system from
penetration from computer viruses and to limit their spread through
intermediate systems.

    The virus scanning software should be configured to perform scans
dynamically on accessed files. If this capability is not available, the system
must be configured to scan, at a minimum, all altered files on the system on a
daily basis.

    If the system processes inbound SMTP mail, the virus scanner must be
configured to scan all received mail.

```
New:
```
Virus scanning software can be used to protect a system from penetration from computer viruses and to limit their spread through intermediate systems.  

The virus scanning software should be configured to perform scans dynamically on accessed files. If this capability is not available, the system must be configured to scan, at a minimum, all altered files on the system on a daily basis.

If the system processes inbound SMTP mail, the virus scanner must be configured to scan all received mail.

```
---
V-72217:
Old:
```
Operating system management includes the ability to control the number
of users and user sessions that utilize an operating system. Limiting the
number of allowed users and sessions per user is helpful in reducing the risks
related to DoS attacks.

    This requirement addresses concurrent sessions for information system
accounts and does not address concurrent sessions by single users via multiple
system accounts. The maximum number of concurrent sessions should be defined
based on mission needs and the operational environment for each system.

```
New:
```
Operating system management includes the ability to control the number of users and user sessions that utilize an operating system. Limiting the number of allowed users and sessions per user is helpful in reducing the risks related to DoS attacks.

This requirement addresses concurrent sessions for information system accounts and does not address concurrent sessions by single users via multiple system accounts. The maximum number of concurrent sessions should be defined based on mission needs and the operational environment for each system.

```
---
V-72219:
Old:
```
In order to prevent unauthorized connection of devices, unauthorized
transfer of information, or unauthorized tunneling (i.e., embedding of data
types within data types), organizations must disable or restrict unused or
unnecessary physical and logical ports/protocols on information systems.

    Operating systems are capable of providing a wide variety of functions and
services. Some of the functions and services provided by default may not be
necessary to support essential organizational operations. Additionally, it is
sometimes convenient to provide multiple services from a single component
(e.g., VPN and IPS); however, doing so increases risk over limiting the
services provided by any one component.

    To support the requirements and principles of least functionality, the
operating system must support the organizational requirements, providing only
essential capabilities and limiting the use of ports, protocols, and/or
services to only those required, authorized, and approved to conduct official
business or to address authorized quality of life issues.

```
New:
```
In order to prevent unauthorized connection of devices, unauthorized transfer of information, or unauthorized tunneling (i.e., embedding of data types within data types), organizations must disable or restrict unused or unnecessary physical and logical ports/protocols on information systems.

Operating systems are capable of providing a wide variety of functions and services. Some of the functions and services provided by default may not be necessary to support essential organizational operations. Additionally, it is sometimes convenient to provide multiple services from a single component (e.g., VPN and IPS); however, doing so increases risk over limiting the services provided by any one component.

To support the requirements and principles of least functionality, the operating system must support the organizational requirements, providing only essential capabilities and limiting the use of ports, protocols, and/or services to only those required, authorized, and approved to conduct official business or to address authorized quality of life issues.



```
---
V-72221:
Old:
```
Unapproved mechanisms that are used for authentication to the
cryptographic module are not verified and therefore cannot be relied upon to
provide confidentiality or integrity, and DoD data may be compromised.

    Operating systems utilizing encryption are required to use FIPS-compliant
mechanisms for authenticating to cryptographic modules.

    FIPS 140-2 is the current standard for validating that mechanisms used to
access cryptographic modules utilize authentication that meets DoD
requirements. This allows for Security Levels 1, 2, 3, or 4 for use on a
general purpose computing system.

```
New:
```
Unapproved mechanisms that are used for authentication to the cryptographic module are not verified and therefore cannot be relied upon to provide confidentiality or integrity, and DoD data may be compromised.

Operating systems utilizing encryption are required to use FIPS-compliant mechanisms for authenticating to cryptographic modules.

FIPS 140-2 is the current standard for validating that mechanisms used to access cryptographic modules utilize authentication that meets DoD requirements. This allows for Security Levels 1, 2, 3, or 4 for use on a general purpose computing system.



```
---
V-72223:
Old:
```
Terminating an idle session within a short time period reduces the
window of opportunity for unauthorized personnel to take control of a
management session enabled on the console or console port that has been left
unattended. In addition, quickly terminating an idle session will also free up
resources committed by the managed network element.

    Terminating network connections associated with communications sessions
includes, for example, de-allocating associated TCP/IP address/port pairs at
the operating system level and de-allocating networking assignments at the
application level if multiple application sessions are using a single operating
system-level network connection. This does not mean that the operating system
terminates all sessions or network access; it only ends the inactive session
and releases the resources associated with that session.

```
New:
```
Terminating an idle session within a short time period reduces the window of opportunity for unauthorized personnel to take control of a management session enabled on the console or console port that has been left unattended. In addition, quickly terminating an idle session will also free up resources committed by the managed network element. 

Terminating network connections associated with communications sessions includes, for example, de-allocating associated TCP/IP address/port pairs at the operating system level and de-allocating networking assignments at the application level if multiple application sessions are using a single operating system-level network connection. This does not mean that the operating system terminates all sessions or network access; it only ends the inactive session and releases the resources associated with that session.

```
---
V-72225:
Old:
```
Display of a standardized and approved use notification before
granting access to the publicly accessible operating system ensures privacy and
security notification verbiage used is consistent with applicable federal laws,
Executive Orders, directives, policies, regulations, standards, and guidance.

    System use notifications are required only for access via logon interfaces
with human users and are not required when such human interfaces do not exist.

    The banner must be formatted in accordance with applicable DoD policy. Use
the following verbiage for operating systems that can accommodate banners of
1300 characters:

    "You are accessing a U.S. Government (USG) Information System (IS) that is
provided for USG-authorized use only.

    By using this IS (which includes any device attached to this IS), you
consent to the following conditions:

    -The USG routinely intercepts and monitors communications on this IS for
purposes including, but not limited to, penetration testing, COMSEC monitoring,
network operations and defense, personnel misconduct (PM), law enforcement
(LE), and counterintelligence (CI) investigations.

    -At any time, the USG may inspect and seize data stored on this IS.

    -Communications using, or data stored on, this IS are not private, are
subject to routine monitoring, interception, and search, and may be disclosed
or used for any USG-authorized purpose.

    -This IS includes security measures (e.g., authentication and access
controls) to protect USG interests--not for your personal benefit or privacy.

    -Notwithstanding the above, using this IS does not constitute consent to
PM, LE or CI investigative searching or monitoring of the content of privileged
communications, or work product, related to personal representation or services
by attorneys, psychotherapists, or clergy, and their assistants. Such
communications and work product are private and confidential. See User
Agreement for details."

```
New:
```
Display of a standardized and approved use notification before granting access to the publicly accessible operating system ensures privacy and security notification verbiage used is consistent with applicable federal laws, Executive Orders, directives, policies, regulations, standards, and guidance.

System use notifications are required only for access via logon interfaces with human users and are not required when such human interfaces do not exist.

The banner must be formatted in accordance with applicable DoD policy. Use the following verbiage for operating systems that can accommodate banners of 1300 characters:

"You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.

By using this IS (which includes any device attached to this IS), you consent to the following conditions:

-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.

-At any time, the USG may inspect and seize data stored on this IS.

-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.

-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.

-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details."



```
---
V-72227:
Old:
```
Without cryptographic integrity protections, information can be
altered by unauthorized users without detection.

    Cryptographic mechanisms used for protecting the integrity of information
include, for example, signed hash functions using asymmetric cryptography
enabling distribution of the public key to verify the hash information while
maintaining the confidentiality of the key used to generate the hash.

```
New:
```
Without cryptographic integrity protections, information can be altered by unauthorized users without detection.

Cryptographic mechanisms used for protecting the integrity of information include, for example, signed hash functions using asymmetric cryptography enabling distribution of the public key to verify the hash information while maintaining the confidentiality of the key used to generate the hash.

```
---
V-72229:
Old:
```
Without cryptographic integrity protections, information can be
altered by unauthorized users without detection.

    Cryptographic mechanisms used for protecting the integrity of information
include, for example, signed hash functions using asymmetric cryptography
enabling distribution of the public key to verify the hash information while
maintaining the confidentiality of the key used to generate the hash.

```
New:
```
Without cryptographic integrity protections, information can be altered by unauthorized users without detection.

Cryptographic mechanisms used for protecting the integrity of information include, for example, signed hash functions using asymmetric cryptography enabling distribution of the public key to verify the hash information while maintaining the confidentiality of the key used to generate the hash.

```
---
V-72231:
Old:
```
Without cryptographic integrity protections, information can be
altered by unauthorized users without detection.

    Cryptographic mechanisms used for protecting the integrity of information
include, for example, signed hash functions using asymmetric cryptography
enabling distribution of the public key to verify the hash information while
maintaining the confidentiality of the key used to generate the hash.

```
New:
```
Without cryptographic integrity protections, information can be altered by unauthorized users without detection.

Cryptographic mechanisms used for protecting the integrity of information include, for example, signed hash functions using asymmetric cryptography enabling distribution of the public key to verify the hash information while maintaining the confidentiality of the key used to generate the hash.

```
---
V-72233:
Old:
```
Without protection of the transmitted information, confidentiality and
integrity may be compromised because unprotected communications can be
intercepted and either read or altered.

    This requirement applies to both internal and external networks and all
types of information system components from which information can be
transmitted (e.g., servers, mobile devices, notebook computers, printers,
copiers, scanners, and facsimile machines). Communication paths outside the
physical protection of a controlled boundary are exposed to the possibility of
interception and modification.

    Protecting the confidentiality and integrity of organizational information
can be accomplished by physical means (e.g., employing physical distribution
systems) or by logical means (e.g., employing cryptographic techniques). If
physical means of protection are employed, logical means (cryptography) do not
have to be employed, and vice versa.

```
New:
```
Without protection of the transmitted information, confidentiality and integrity may be compromised because unprotected communications can be intercepted and either read or altered. 

This requirement applies to both internal and external networks and all types of information system components from which information can be transmitted (e.g., servers, mobile devices, notebook computers, printers, copiers, scanners, and facsimile machines). Communication paths outside the physical protection of a controlled boundary are exposed to the possibility of interception and modification. 

Protecting the confidentiality and integrity of organizational information can be accomplished by physical means (e.g., employing physical distribution systems) or by logical means (e.g., employing cryptographic techniques). If physical means of protection are employed, logical means (cryptography) do not have to be employed, and vice versa.



```
---
V-72235:
Old:
```
Without protection of the transmitted information, confidentiality and
integrity may be compromised because unprotected communications can be
intercepted and either read or altered.

    This requirement applies to both internal and external networks and all
types of information system components from which information can be
transmitted (e.g., servers, mobile devices, notebook computers, printers,
copiers, scanners, and facsimile machines). Communication paths outside the
physical protection of a controlled boundary are exposed to the possibility of
interception and modification.

    Protecting the confidentiality and integrity of organizational information
can be accomplished by physical means (e.g., employing physical distribution
systems) or by logical means (e.g., employing cryptographic techniques). If
physical means of protection are employed, then logical means (cryptography) do
not have to be employed, and vice versa.

```
New:
```
Without protection of the transmitted information, confidentiality and integrity may be compromised because unprotected communications can be intercepted and either read or altered. 

This requirement applies to both internal and external networks and all types of information system components from which information can be transmitted (e.g., servers, mobile devices, notebook computers, printers, copiers, scanners, and facsimile machines). Communication paths outside the physical protection of a controlled boundary are exposed to the possibility of interception and modification. 

Protecting the confidentiality and integrity of organizational information can be accomplished by physical means (e.g., employing physical distribution systems) or by logical means (e.g., employing cryptographic techniques). If physical means of protection are employed, then logical means (cryptography) do not have to be employed, and vice versa.



```
---
V-72237:
Old:
```
Terminating an idle SSH session within a short time period reduces the
window of opportunity for unauthorized personnel to take control of a
management session enabled on the console or console port that has been left
unattended. In addition, quickly terminating an idle SSH session will also free
up resources committed by the managed network element.

    Terminating network connections associated with communications sessions
includes, for example, de-allocating associated TCP/IP address/port pairs at
the operating system level and de-allocating networking assignments at the
application level if multiple application sessions are using a single operating
system-level network connection. This does not mean that the operating system
terminates all sessions or network access; it only ends the inactive session
and releases the resources associated with that session.

```
New:
```
Terminating an idle SSH session within a short time period reduces the window of opportunity for unauthorized personnel to take control of a management session enabled on the console or console port that has been left unattended. In addition, quickly terminating an idle SSH session will also free up resources committed by the managed network element.

Terminating network connections associated with communications sessions includes, for example, de-allocating associated TCP/IP address/port pairs at the operating system level and de-allocating networking assignments at the application level if multiple application sessions are using a single operating system-level network connection. This does not mean that the operating system terminates all sessions or network access; it only ends the inactive session and releases the resources associated with that session.



```
---
V-72239:
Old:
```
Configuring this setting for the SSH daemon provides additional
assurance that remote logon via SSH will require a password, even in the event
of misconfiguration elsewhere.

```
New:
```
Configuring this setting for the SSH daemon provides additional assurance that remote logon via SSH will require a password, even in the event of misconfiguration elsewhere.

```
---
V-72241:
Old:
```
Terminating an idle SSH session within a short time period reduces the
window of opportunity for unauthorized personnel to take control of a
management session enabled on the console or console port that has been left
unattended. In addition, quickly terminating an idle SSH session will also free
up resources committed by the managed network element.

    Terminating network connections associated with communications sessions
includes, for example, de-allocating associated TCP/IP address/port pairs at
the operating system level and de-allocating networking assignments at the
application level if multiple application sessions are using a single operating
system-level network connection. This does not mean that the operating system
terminates all sessions or network access; it only ends the inactive session
and releases the resources associated with that session.

```
New:
```
Terminating an idle SSH session within a short time period reduces the window of opportunity for unauthorized personnel to take control of a management session enabled on the console or console port that has been left unattended. In addition, quickly terminating an idle SSH session will also free up resources committed by the managed network element.

Terminating network connections associated with communications sessions includes, for example, de-allocating associated TCP/IP address/port pairs at the operating system level and de-allocating networking assignments at the application level if multiple application sessions are using a single operating system-level network connection. This does not mean that the operating system terminates all sessions or network access; it only ends the inactive session and releases the resources associated with that session.



```
---
V-72243:
Old:
```
Configuring this setting for the SSH daemon provides additional
assurance that remote logon via SSH will require a password, even in the event
of misconfiguration elsewhere.

```
New:
```
Configuring this setting for the SSH daemon provides additional assurance that remote logon via SSH will require a password, even in the event of misconfiguration elsewhere.

```
---
V-72245:
Old:
```
Providing users with feedback on when account accesses via SSH last
occurred facilitates user recognition and reporting of unauthorized account
use.

```
New:
```
Providing users with feedback on when account accesses via SSH last occurred facilitates user recognition and reporting of unauthorized account use.

```
---
V-72247:
Old:
```
Even though the communications channel may be encrypted, an additional
layer of security is gained by extending the policy of not logging on directly
as root. In addition, logging on with a user-specific account provides
individual accountability of actions performed on the system.

```
New:
```
Even though the communications channel may be encrypted, an additional layer of security is gained by extending the policy of not logging on directly as root. In addition, logging on with a user-specific account provides individual accountability of actions performed on the system.

```
---
V-72249:
Old:
```
Configuring this setting for the SSH daemon provides additional
assurance that remote logon via SSH will require a password, even in the event
of misconfiguration elsewhere.

```
New:
```
Configuring this setting for the SSH daemon provides additional assurance that remote logon via SSH will require a password, even in the event of misconfiguration elsewhere.

```
---
V-72251:
Old:
```
SSHv1 is an insecure implementation of the SSH protocol and has many
well-known vulnerability exploits. Exploits of the SSH daemon could provide
immediate root access to the system.

```
New:
```
SSHv1 is an insecure implementation of the SSH protocol and has many well-known vulnerability exploits. Exploits of the SSH daemon could provide immediate root access to the system.



```
---
V-72253:
Old:
```
DoD information systems are required to use FIPS 140-2 approved
cryptographic hash functions. The only SSHv2 hash algorithm meeting this
requirement is SHA.

```
New:
```
DoD information systems are required to use FIPS 140-2 approved cryptographic hash functions. The only SSHv2 hash algorithm meeting this requirement is SHA.

```
---
V-72255:
Old:
```
If a public host key file is modified by an unauthorized user, the SSH
service may be compromised.

```
New:
```
If a public host key file is modified by an unauthorized user, the SSH service may be compromised.

```
---
V-72257:
Old:
```
If an unauthorized user obtains the private SSH host key file, the
host could be impersonated.

```
New:
```
If an unauthorized user obtains the private SSH host key file, the host could be impersonated.

```
---
V-72259:
Old:
```
GSSAPI authentication is used to provide additional authentication
mechanisms to applications. Allowing GSSAPI authentication through SSH exposes
the system's GSSAPI to remote hosts, increasing the attack surface of the
system. GSSAPI authentication must be disabled unless needed.

```
New:
```
GSSAPI authentication is used to provide additional authentication mechanisms to applications. Allowing GSSAPI authentication through SSH exposes the system's GSSAPI to remote hosts, increasing the attack surface of the system. GSSAPI authentication must be disabled unless needed.

```
---
V-72261:
Old:
```
Kerberos authentication for SSH is often implemented using Generic
Security Service Application Program Interface (GSSAPI). If Kerberos is enabled
through SSH, the SSH daemon provides a means of access to the system's Kerberos
implementation. Vulnerabilities in the system's Kerberos implementation may
then be subject to exploitation. To reduce the attack surface of the system,
the Kerberos authentication mechanism within SSH must be disabled for systems
not using this capability.

```
New:
```
Kerberos authentication for SSH is often implemented using Generic Security Service Application Program Interface (GSSAPI). If Kerberos is enabled through SSH, the SSH daemon provides a means of access to the system's Kerberos implementation. Vulnerabilities in the system's Kerberos implementation may then be subject to exploitation. To reduce the attack surface of the system, the Kerberos authentication mechanism within SSH must be disabled for systems not using this capability.

```
---
V-72263:
Old:
```
If other users have access to modify user-specific SSH configuration
files, they may be able to log on to the system as another user.

```
New:
```
If other users have access to modify user-specific SSH configuration files, they may be able to log on to the system as another user.

```
---
V-72265:
Old:
```
SSH daemon privilege separation causes the SSH process to drop root
privileges when not needed, which would decrease the impact of software
vulnerabilities in the unprivileged section.

```
New:
```
SSH daemon privilege separation causes the SSH process to drop root privileges when not needed, which would decrease the impact of software vulnerabilities in the unprivileged section.

```
---
V-72267:
Old:
```
If compression is allowed in an SSH connection prior to
authentication, vulnerabilities in the compression software could result in
compromise of the system from an unauthenticated connection, potentially with
root privileges.

```
New:
```
If compression is allowed in an SSH connection prior to authentication, vulnerabilities in the compression software could result in compromise of the system from an unauthenticated connection, potentially with root privileges.

```
---
V-72269:
Old:
```
Inaccurate time stamps make it more difficult to correlate events and
can lead to an inaccurate analysis. Determining the correct time a particular
event occurred on a system is critical when conducting forensic analysis and
investigating system events. Sources outside the configured acceptable
allowance (drift) may be inaccurate.

    Synchronizing internal information system clocks provides uniformity of
time stamps for information systems with multiple system clocks and systems
connected over a network.

    Organizations should consider endpoints that may not have regular access to
the authoritative time server (e.g., mobile, teleworking, and tactical
endpoints).

```
New:
```
Inaccurate time stamps make it more difficult to correlate events and can lead to an inaccurate analysis. Determining the correct time a particular event occurred on a system is critical when conducting forensic analysis and investigating system events. Sources outside the configured acceptable allowance (drift) may be inaccurate.

Synchronizing internal information system clocks provides uniformity of time stamps for information systems with multiple system clocks and systems connected over a network.

Organizations should consider endpoints that may not have regular access to the authoritative time server (e.g., mobile, teleworking, and tactical endpoints).



```
---
V-72273:
Old:
```
Firewalls protect computers from network attacks by blocking or
limiting access to open network ports. Application firewalls limit which
applications are allowed to communicate over the network.

```
New:
```
Firewalls protect computers from network attacks by blocking or limiting access to open network ports. Application firewalls limit which applications are allowed to communicate over the network.



```
---
V-72275:
Old:
```
Providing users with feedback on when account accesses last occurred
facilitates user recognition and reporting of unauthorized account use.

```
New:
```
Providing users with feedback on when account accesses last occurred facilitates user recognition and reporting of unauthorized account use.

```
---
V-72277:
Old:
```
The .shosts files are used to configure host-based authentication for
individual users or the system via SSH. Host-based authentication is not
sufficient for preventing unauthorized access to the system, as it does not
require interactive identification and authentication of a connection request,
or for the use of two-factor authentication.

```
New:
```
The .shosts files are used to configure host-based authentication for individual users or the system via SSH. Host-based authentication is not sufficient for preventing unauthorized access to the system, as it does not require interactive identification and authentication of a connection request, or for the use of two-factor authentication.

```
---
V-72279:
Old:
```
The shosts.equiv files are used to configure host-based authentication
for the system via SSH. Host-based authentication is not sufficient for
preventing unauthorized access to the system, as it does not require
interactive identification and authentication of a connection request, or for
the use of two-factor authentication.

```
New:
```
The shosts.equiv files are used to configure host-based authentication for the system via SSH. Host-based authentication is not sufficient for preventing unauthorized access to the system, as it does not require interactive identification and authentication of a connection request, or for the use of two-factor authentication.

```
---
V-72281:
Old:
```
To provide availability for name resolution services, multiple
redundant name servers are mandated. A failure in name resolution could lead to
the failure of security functions requiring name resolution, which may include
time synchronization, centralized authentication, and remote system logging.

```
New:
```
To provide availability for name resolution services, multiple redundant name servers are mandated. A failure in name resolution could lead to the failure of security functions requiring name resolution, which may include time synchronization, centralized authentication, and remote system logging.

```
---
V-72283:
Old:
```
Source-routed packets allow the source of the packet to suggest that
routers forward the packet along a different path than configured on the
router, which can be used to bypass network security measures. This requirement
applies only to the forwarding of source-routed traffic, such as when IPv4
forwarding is enabled and the system is functioning as a router.

```
New:
```
Source-routed packets allow the source of the packet to suggest that routers forward the packet along a different path than configured on the router, which can be used to bypass network security measures. This requirement applies only to the forwarding of source-routed traffic, such as when IPv4 forwarding is enabled and the system is functioning as a router.

```
---
V-72285:
Old:
```
Source-routed packets allow the source of the packet to suggest that
routers forward the packet along a different path than configured on the
router, which can be used to bypass network security measures. This requirement
applies only to the forwarding of source-routed traffic, such as when IPv4
forwarding is enabled and the system is functioning as a router.

```
New:
```
Source-routed packets allow the source of the packet to suggest that routers forward the packet along a different path than configured on the router, which can be used to bypass network security measures. This requirement applies only to the forwarding of source-routed traffic, such as when IPv4 forwarding is enabled and the system is functioning as a router.

```
---
V-72287:
Old:
```
Responding to broadcast (ICMP) echoes facilitates network mapping and
provides a vector for amplification attacks.

```
New:
```
Responding to broadcast (ICMP) echoes facilitates network mapping and provides a vector for amplification attacks.

```
---
V-72289:
Old:
```
ICMP redirect messages are used by routers to inform hosts that a more
direct route exists for a particular destination. These messages modify the
host's route table and are unauthenticated. An illicit ICMP redirect message
could result in a man-in-the-middle attack.

```
New:
```
ICMP redirect messages are used by routers to inform hosts that a more direct route exists for a particular destination. These messages modify the host's route table and are unauthenticated. An illicit ICMP redirect message could result in a man-in-the-middle attack.

```
---
V-72291:
Old:
```
ICMP redirect messages are used by routers to inform hosts that a more
direct route exists for a particular destination. These messages contain
information from the system's route table, possibly revealing portions of the
network topology.

```
New:
```
ICMP redirect messages are used by routers to inform hosts that a more direct route exists for a particular destination. These messages contain information from the system's route table, possibly revealing portions of the network topology.

```
---
V-72293:
Old:
```
ICMP redirect messages are used by routers to inform hosts that a more
direct route exists for a particular destination. These messages contain
information from the system's route table, possibly revealing portions of the
network topology.

```
New:
```
ICMP redirect messages are used by routers to inform hosts that a more direct route exists for a particular destination. These messages contain information from the system's route table, possibly revealing portions of the network topology.

```
---
V-72295:
Old:
```
Network interfaces in promiscuous mode allow for the capture of all
network traffic visible to the system. If unauthorized individuals can access
these applications, it may allow then to collect information such as logon IDs,
passwords, and key exchanges between systems.

    If the system is being used to perform a network troubleshooting function,
the use of these tools must be documented with the Information System Security
Officer (ISSO) and restricted to only authorized personnel.

```
New:
```
Network interfaces in promiscuous mode allow for the capture of all network traffic visible to the system. If unauthorized individuals can access these applications, it may allow then to collect information such as logon IDs, passwords, and key exchanges between systems.

If the system is being used to perform a network troubleshooting function, the use of these tools must be documented with the Information System Security Officer (ISSO) and restricted to only authorized personnel.

```
---
V-72297:
Old:
```
If unrestricted mail relaying is permitted, unauthorized senders could
use this host as a mail relay for the purpose of sending spam or other
unauthorized activity.

```
New:
```
If unrestricted mail relaying is permitted, unauthorized senders could use this host as a mail relay for the purpose of sending spam or other unauthorized activity.

```
---
V-72299:
Old:
```
The FTP service provides an unencrypted remote access that does not
provide for the confidentiality and integrity of user passwords or the remote
session. If a privileged user were to log on using this service, the privileged
user password could be compromised. SSH or other encrypted file transfer
methods must be used in place of this service.

```
New:
```
The FTP service provides an unencrypted remote access that does not provide for the confidentiality and integrity of user passwords or the remote session. If a privileged user were to log on using this service, the privileged user password could be compromised. SSH or other encrypted file transfer methods must be used in place of this service.

```
---
V-72301:
Old:
```
If TFTP is required for operational support (such as the transmission
of router configurations) its use must be documented with the Information
System Security Officer (ISSO), restricted to only authorized personnel, and
have access control rules established.

```
New:
```
If TFTP is required for operational support (such as the transmission of router configurations) its use must be documented with the Information System Security Officer (ISSO), restricted to only authorized personnel, and have access control rules established.

```
---
V-72303:
Old:
```
Open X displays allow an attacker to capture keystrokes and execute
commands remotely.

```
New:
```
Open X displays allow an attacker to capture keystrokes and execute commands remotely.

```
---
V-72305:
Old:
```
Restricting TFTP to a specific directory prevents remote users from
copying, transferring, or overwriting system files.

```
New:
```
Restricting TFTP to a specific directory prevents remote users from copying, transferring, or overwriting system files.

```
---
V-72307:
Old:
```
Internet services that are not required for system or application
processes must not be active to decrease the attack surface of the system. X
Windows has a long history of security vulnerabilities and will not be used
unless approved and documented.

```
New:
```
Internet services that are not required for system or application processes must not be active to decrease the attack surface of the system. X Windows has a long history of security vulnerabilities and will not be used unless approved and documented.

```
---
V-72309:
Old:
```
Routing protocol daemons are typically used on routers to exchange
network topology information with other routers. If this software is used when
not required, system network information may be unnecessarily transmitted
across the network.

```
New:
```
Routing protocol daemons are typically used on routers to exchange network topology information with other routers. If this software is used when not required, system network information may be unnecessarily transmitted across the network.

```
---
V-72311:
Old:
```
When an NFS server is configured to use RPCSEC_SYS, a selected userid
and groupid are used to handle requests from the remote user. The userid and
groupid could mistakenly or maliciously be set incorrectly. The RPCSEC_GSS
method of authentication uses certificates on the server and client systems to
more securely authenticate the remote mount request.

```
New:
```
When an NFS server is configured to use RPCSEC_SYS, a selected userid and groupid are used to handle requests from the remote user. The userid and groupid could mistakenly or maliciously be set incorrectly. The RPCSEC_GSS method of authentication uses certificates on the server and client systems to more securely authenticate the remote mount request.

```
---
V-72313:
Old:
```
Whether active or not, default Simple Network Management Protocol
(SNMP) community strings must be changed to maintain security. If the service
is running with the default authenticators, anyone can gather data about the
system and the network and use the information to potentially compromise the
integrity of the system or network(s). It is highly recommended that SNMP
version 3 user authentication and message encryption be used in place of the
version 2 community strings.

```
New:
```
Whether active or not, default Simple Network Management Protocol (SNMP) community strings must be changed to maintain security. If the service is running with the default authenticators, anyone can gather data about the system and the network and use the information to potentially compromise the integrity of the system or network(s). It is highly recommended that SNMP version 3 user authentication and message encryption be used in place of the version 2 community strings.

```
---
V-72315:
Old:
```
If the systems access control program is not configured with
appropriate rules for allowing and denying access to system network resources,
services may be accessible to unauthorized hosts.

```
New:
```
If the systems access control program is not configured with appropriate rules for allowing and denying access to system network resources, services may be accessible to unauthorized hosts.

```
---
V-72317:
Old:
```
IP tunneling mechanisms can be used to bypass network filtering. If
tunneling is required, it must be documented with the Information System
Security Officer (ISSO).

```
New:
```
IP tunneling mechanisms can be used to bypass network filtering. If tunneling is required, it must be documented with the Information System Security Officer (ISSO).

```
---
V-72319:
Old:
```
Source-routed packets allow the source of the packet to suggest that
routers forward the packet along a different path than configured on the
router, which can be used to bypass network security measures. This requirement
applies only to the forwarding of source-routed traffic, such as when IPv6
forwarding is enabled and the system is functioning as a router.

```
New:
```
Source-routed packets allow the source of the packet to suggest that routers forward the packet along a different path than configured on the router, which can be used to bypass network security measures. This requirement applies only to the forwarding of source-routed traffic, such as when IPv6 forwarding is enabled and the system is functioning as a router.

```
---
V-72417:
Old:
```
Using an authentication device, such as a CAC or token that is
        separate from the information system, ensures that even if the information
        system is compromised, that compromise will not affect credentials stored on
        the authentication device.

        Multifactor solutions that require devices separate from information
        systems gaining access include, for example, hardware tokens providing
        time-based or challenge-response authenticators and smart cards such as the
        U.S. Government Personal Identity Verification card and the DoD Common Access
        Card.

        A privileged account is defined as an information system account with
        authorizations of a privileged user.

        Remote access is access to DoD nonpublic information systems by an
        authorized user (or an information system) communicating through an external,
        non-organization-controlled network. Remote access methods include, for
        example, dial-up, broadband, and wireless.

        This requirement only applies to components where this is specific to the
        function of the device or has the concept of an organizational user (e.g., VPN,
        proxy capability). This does not apply to authentication for the purpose of
        configuring the device itself (management).

```
New:
```
Using an authentication device, such as a CAC or token that is separate from the information system, ensures that even if the information system is compromised, that compromise will not affect credentials stored on the authentication device.

Multifactor solutions that require devices separate from information systems gaining access include, for example, hardware tokens providing time-based or challenge-response authenticators and smart cards such as the U.S. Government Personal Identity Verification card and the DoD Common Access Card.

A privileged account is defined as an information system account with authorizations of a privileged user.

Remote access is access to DoD nonpublic information systems by an authorized user (or an information system) communicating through an external, non-organization-controlled network. Remote access methods include, for example, dial-up, broadband, and wireless.

This requirement only applies to components where this is specific to the function of the device or has the concept of an organizational user (e.g., VPN, proxy capability). This does not apply to authentication for the purpose of configuring the device itself (management).



```
---
V-72427:
Old:
```
Using an authentication device, such as a CAC or token that is
  separate from the information system, ensures that even if the information
  system is compromised, that compromise will not affect credentials stored on
  the authentication device.

      Multifactor solutions that require devices separate from information
  systems gaining access include, for example, hardware tokens providing
  time-based or challenge-response authenticators and smart cards such as the
  U.S. Government Personal Identity Verification card and the DoD Common Access
  Card.

      A privileged account is defined as an information system account with
  authorizations of a privileged user.

      Remote access is access to DoD nonpublic information systems by an
  authorized user (or an information system) communicating through an external,
  non-organization-controlled network. Remote access methods include, for
  example, dial-up, broadband, and wireless.

      This requirement only applies to components where this is specific to the
  function of the device or has the concept of an organizational user (e.g., VPN,
  proxy capability). This does not apply to authentication for the purpose of
  configuring the device itself (management).

```
New:
```
Using an authentication device, such as a CAC or token that is separate from the information system, ensures that even if the information system is compromised, that compromise will not affect credentials stored on the authentication device.

Multifactor solutions that require devices separate from information systems gaining access include, for example, hardware tokens providing time-based or challenge-response authenticators and smart cards such as the U.S. Government Personal Identity Verification card and the DoD Common Access Card.

A privileged account is defined as an information system account with authorizations of a privileged user.

Remote access is access to DoD nonpublic information systems by an authorized user (or an information system) communicating through an external, non-organization-controlled network. Remote access methods include, for example, dial-up, broadband, and wireless.

This requirement only applies to components where this is specific to the function of the device or has the concept of an organizational user (e.g., VPN, proxy capability). This does not apply to authentication for the purpose of configuring the device itself (management).



```
---
V-72433:
Old:
```
Using an authentication device, such as a CAC or token that is
separate from the information system, ensures that even if the information
system is compromised, that compromise will not affect credentials stored on
the authentication device.

    Multifactor solutions that require devices separate from information
systems gaining access include, for example, hardware tokens providing
time-based or challenge-response authenticators and smart cards such as the
U.S. Government Personal Identity Verification card and the DoD Common Access
Card.

    A privileged account is defined as an information system account with
authorizations of a privileged user.

    Remote access is access to DoD nonpublic information systems by an
authorized user (or an information system) communicating through an external,
non-organization-controlled network. Remote access methods include, for
example, dial-up, broadband, and wireless.

    This requirement only applies to components where this is specific to the
function of the device or has the concept of an organizational user (e.g., VPN,
proxy capability). This does not apply to authentication for the purpose of
configuring the device itself (management).

```
New:
```
Using an authentication device, such as a CAC or token that is separate from the information system, ensures that even if the information system is compromised, that compromise will not affect credentials stored on the authentication device.

Multifactor solutions that require devices separate from information systems gaining access include, for example, hardware tokens providing time-based or challenge-response authenticators and smart cards such as the U.S. Government Personal Identity Verification card and the DoD Common Access Card.

A privileged account is defined as an information system account with authorizations of a privileged user.

Remote access is access to DoD nonpublic information systems by an authorized user (or an information system) communicating through an external, non-organization-controlled network. Remote access methods include, for example, dial-up, broadband, and wireless.

This requirement only applies to components where this is specific to the function of the device or has the concept of an organizational user (e.g., VPN, proxy capability). This does not apply to authentication for the purpose of configuring the device itself (management).



```
---
V-73155:
Old:
```
A session time-out lock is a temporary action taken when a user stops
  work and moves away from the immediate physical vicinity of the information
  system but does not log out because of the temporary nature of the absence.
  Rather than relying on the user to manually lock their operating system session
  prior to vacating the vicinity, operating systems need to be able to identify
  when a user's session has idled and take action to initiate the session lock.

      The session lock is implemented at the point where session activity can be
  determined and/or controlled.

```
New:
```
A session time-out lock is a temporary action taken when a user stops work and moves away from the immediate physical vicinity of the information system but does not log out because of the temporary nature of the absence. Rather than relying on the user to manually lock their operating system session prior to vacating the vicinity, operating systems need to be able to identify when a user's session has idled and take action to initiate the session lock.

The session lock is implemented at the point where session activity can be determined and/or controlled.

```
---
V-73157:
Old:
```
A session time-out lock is a temporary action taken when a user stops
work and moves away from the immediate physical vicinity of the information
system but does not log out because of the temporary nature of the absence.
Rather than relying on the user to manually lock their operating system session
prior to vacating the vicinity, operating systems need to be able to identify
when a user's session has idled and take action to initiate the session lock.

    The session lock is implemented at the point where session activity can be
determined and/or controlled.

```
New:
```
A session time-out lock is a temporary action taken when a user stops work and moves away from the immediate physical vicinity of the information system but does not log out because of the temporary nature of the absence. Rather than relying on the user to manually lock their operating system session prior to vacating the vicinity, operating systems need to be able to identify when a user's session has idled and take action to initiate the session lock.

The session lock is implemented at the point where session activity can be determined and/or controlled.

```
---
V-73159:
Old:
```
Use of a complex password helps to increase the time and resources
required to compromise the password. Password complexity, or strength, is a
measure of the effectiveness of a password in resisting attempts at guessing
and brute-force attacks. "pwquality" enforces complex password construction
configuration and has the ability to limit brute-force attacks on the system.

```
New:
```
Use of a complex password helps to increase the time and resources required to compromise the password. Password complexity, or strength, is a measure of the effectiveness of a password in resisting attempts at guessing and brute-force attacks. "pwquality" enforces complex password construction configuration and has the ability to limit brute-force attacks on the system.

```
---
V-73161:
Old:
```
The "noexec" mount option causes the system to not execute binary
files. This option must be used for mounting any file system not containing
approved binary files as they may be incompatible. Executing files from
untrusted file systems increases the opportunity for unprivileged users to
attain unauthorized administrative access.

```
New:
```
The "noexec" mount option causes the system to not execute binary files. This option must be used for mounting any file system not containing approved binary files as they may be incompatible. Executing files from untrusted file systems increases the opportunity for unprivileged users to attain unauthorized administrative access.

```
---
V-73163:
Old:
```
Taking appropriate action when there is an error sending audit records
to a remote system will minimize the possibility of losing audit records.

```
New:
```
Taking appropriate action when there is an error sending audit records to a remote system will minimize the possibility of losing audit records.

```
---
V-73165:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).

```
---
V-73167:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).

```
---
V-73171:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).

```
---
V-73173:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one.

Audit records can be generated from various components within the information system (e.g., module or policy filter).

```
---
V-73175:
Old:
```
ICMP redirect messages are used by routers to inform hosts that a more
direct route exists for a particular destination. These messages modify the
host's route table and are unauthenticated. An illicit ICMP redirect message
could result in a man-in-the-middle attack.

```
New:
```
ICMP redirect messages are used by routers to inform hosts that a more direct route exists for a particular destination. These messages modify the host's route table and are unauthenticated. An illicit ICMP redirect message could result in a man-in-the-middle attack.

```
---
V-73177:
Old:
```
The use of wireless networking can introduce many different attack
vectors into the organization's network. Common attack vectors such as
malicious association and ad hoc networks will allow an attacker to spoof a
wireless access point (AP), allowing validated systems to connect to the
malicious AP and enabling the attacker to monitor and record network traffic.
These malicious APs can also serve to create a man-in-the-middle attack or be
used to create a denial of service to valid network resources.

```
New:
```
The use of wireless networking can introduce many different attack vectors into the organization's network. Common attack vectors such as malicious association and ad hoc networks will allow an attacker to spoof a wireless access point (AP), allowing validated systems to connect to the malicious AP and enabling the attacker to monitor and record network traffic. These malicious APs can also serve to create a man-in-the-middle attack or be used to create a denial of service to valid network resources.

```
---
V-77819:
Old:
```
To assure accountability and prevent unauthenticated access, users
must be identified and authenticated to prevent potential misuse and compromise
of the system.

    Multifactor solutions that require devices separate from information
systems gaining access include, for example, hardware tokens providing
time-based or challenge-response authenticators and smart cards such as the
U.S. Government Personal Identity Verification card and the DoD Common Access
Card.

```
New:
```
To assure accountability and prevent unauthenticated access, users must be identified and authenticated to prevent potential misuse and compromise of the system.

Multifactor solutions that require devices separate from information systems gaining access include, for example, hardware tokens providing time-based or challenge-response authenticators and smart cards such as the U.S. Government Personal Identity Verification card and the DoD Common Access Card.



```
---
V-77821:
Old:
```
Disabling DCCP protects the system against exploitation of any flaws
in the protocol implementation.

```
New:
```
Disabling DCCP protects the system against exploitation of any flaws in the protocol implementation.

```
---
V-77823:
Old:
```
If the system does not require valid root authentication before it
boots into single-user or maintenance mode, anyone who invokes single-user or
maintenance mode is granted privileged access to all files on the system.

```
New:
```
If the system does not require valid root authentication before it boots into single-user or maintenance mode, anyone who invokes single-user or maintenance mode is granted privileged access to all files on the system.

```
---
V-77825:
Old:
```
Address space layout randomization (ASLR) makes it more difficult for
an attacker to predict the location of attack code he or she has introduced
into a process's address space during an attempt at exploitation. Additionally,
ASLR also makes it more difficult for an attacker to know the location of
existing code in order to repurpose it using return-oriented programming (ROP)
techniques.

```
New:
```
Address space layout randomization (ASLR) makes it more difficult for an attacker to predict the location of attack code he or she has introduced into a process's address space during an attempt at exploitation. Additionally, ASLR also makes it more difficult for an attacker to know the location of existing code in order to repurpose it using return-oriented programming (ROP) techniques.

```
---
V-78995:
Old:
```
A session lock is a temporary action taken when a user stops work and
moves away from the immediate physical vicinity of the information system but
does not want to log out because of the temporary nature of the absence.

    The session lock is implemented at the point where session activity can be
determined.

    The ability to enable/disable a session lock is given to the user by
default. Disabling the user’s ability to disengage the graphical user interface
session lock provides the assurance that all sessions will lock after the
specified period of time.

```
New:
```
A session lock is a temporary action taken when a user stops work and moves away from the immediate physical vicinity of the information system but does not want to log out because of the temporary nature of the absence.

The session lock is implemented at the point where session activity can be determined.

The ability to enable/disable a session lock is given to the user by default. Disabling the user’s ability to disengage the graphical user interface session lock provides the assurance that all sessions will lock after the specified period of time.

```
---
V-78997:
Old:
```
A session lock is a temporary action taken when a user stops work and
moves away from the immediate physical vicinity of the information system but
does not want to log out because of the temporary nature of the absence.

    The session lock is implemented at the point where session activity can be
determined.

    The ability to enable/disable a session lock is given to the user by
default. Disabling the user's ability to disengage the graphical user interface
session lock provides the assurance that all sessions will lock after the
specified period of time.

```
New:
```
A session lock is a temporary action taken when a user stops work and moves away from the immediate physical vicinity of the information system but does not want to log out because of the temporary nature of the absence.

The session lock is implemented at the point where session activity can be determined.

The ability to enable/disable a session lock is given to the user by default. Disabling the user's ability to disengage the graphical user interface session lock provides the assurance that all sessions will lock after the specified period of time.

```
---
V-78999:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one. 

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-79001:
Old:
```
Without generating audit records that are specific to the security and
mission needs of the organization, it would be difficult to establish,
correlate, and investigate the events relating to an incident or identify those
responsible for one.

    Audit records can be generated from various components within the
information system (e.g., module or policy filter).

```
New:
```
Without generating audit records that are specific to the security and mission needs of the organization, it would be difficult to establish, correlate, and investigate the events relating to an incident or identify those responsible for one. 

Audit records can be generated from various components within the information system (e.g., module or policy filter).



```
---
V-81003:
Old:
```
Pluggable authentication modules (PAM) allow for a modular approach to
integrating authentication methods. PAM operates in a top-down processing model
and if the modules are not listed in the correct order, an important security
function could be bypassed if stack entries are not centralized.

```
New:
```
Pluggable authentication modules (PAM) allow for a modular approach to integrating authentication methods. PAM operates in a top-down processing model and if the modules are not listed in the correct order, an important security function could be bypassed if stack entries are not centralized.

```
---
V-81005:
Old:
```
If the system does not require valid root authentication before it
boots into single-user or maintenance mode, anyone who invokes single-user or
maintenance mode is granted privileged access to all files on the system. GRUB
2 is the default boot loader for RHEL 7 and is designed to require a password
to boot into single-user mode or make modifications to the boot menu.

```
New:
```
If the system does not require valid root authentication before it boots into single-user or maintenance mode, anyone who invokes single-user or maintenance mode is granted privileged access to all files on the system. GRUB 2 is the default boot loader for RHEL 7 and is designed to require a password to boot into single-user mode or make modifications to the boot menu.

```
---
V-81007:
Old:
```
If the system does not require valid root authentication before it
boots into single-user or maintenance mode, anyone who invokes single-user or
maintenance mode is granted privileged access to all files on the system. GRUB
2 is the default boot loader for RHEL 7 and is designed to require a password
to boot into single-user mode or make modifications to the boot menu.

```
New:
```
If the system does not require valid root authentication before it boots into single-user or maintenance mode, anyone who invokes single-user or maintenance mode is granted privileged access to all files on the system. GRUB 2 is the default boot loader for RHEL 7 and is designed to require a password to boot into single-user mode or make modifications to the boot menu.

```
---
V-81009:
Old:
```
The "nodev" mount option causes the system to not interpret
character or block special devices. Executing character or block special
devices from untrusted file systems increases the opportunity for unprivileged
users to attain unauthorized administrative access.

```
New:
```
The "nodev" mount option causes the system to not interpret character or block special devices. Executing character or block special devices from untrusted file systems increases the opportunity for unprivileged users to attain unauthorized administrative access.

```
---
V-81011:
Old:
```
The "nosuid" mount option causes the system to not execute
"setuid" and "setgid" files with owner privileges. This option must be used
for mounting any file system not containing approved "setuid" and "setguid"
files. Executing files from untrusted file systems increases the opportunity
for unprivileged users to attain unauthorized administrative access.

```
New:
```
The "nosuid" mount option causes the system to not execute "setuid" and "setgid" files with owner privileges. This option must be used for mounting any file system not containing approved "setuid" and "setguid" files. Executing files from untrusted file systems increases the opportunity for unprivileged users to attain unauthorized administrative access.

```
---
V-81013:
Old:
```
The "noexec" mount option causes the system to not execute binary
files. This option must be used for mounting any file system not containing
approved binary files as they may be incompatible. Executing files from
untrusted file systems increases the opportunity for unprivileged users to
attain unauthorized administrative access.

```
New:
```
The "noexec" mount option causes the system to not execute binary files. This option must be used for mounting any file system not containing approved binary files as they may be incompatible. Executing files from untrusted file systems increases the opportunity for unprivileged users to attain unauthorized administrative access.

```
---
V-81015:
Old:
```
Information stored in one location is vulnerable to accidental or
incidental deletion or alteration.

    Off-loading is a common process in information systems with limited audit
storage capacity.

    Without the configuration of the "au-remote" plugin, the audisp-remote
daemon will not off-load the logs from the system being audited.

```
New:
```
Information stored in one location is vulnerable to accidental or incidental deletion or alteration.

Off-loading is a common process in information systems with limited audit storage capacity.

Without the configuration of the "au-remote" plugin, the audisp-remote daemon will not off-load the logs from the system being audited.



```
---
V-81017:
Old:
```
Information stored in one location is vulnerable to accidental or
incidental deletion or alteration.

    Off-loading is a common process in information systems with limited audit
storage capacity.

    Without the configuration of the "au-remote" plugin, the audisp-remote
daemon will not off load the logs from the system being audited.

```
New:
```
Information stored in one location is vulnerable to accidental or incidental deletion or alteration.

Off-loading is a common process in information systems with limited audit storage capacity.

Without the configuration of the "au-remote" plugin, the audisp-remote daemon will not off load the logs from the system being audited.



```
---
V-81019:
Old:
```
Information stored in one location is vulnerable to accidental or
incidental deletion or alteration.

    Off-loading is a common process in information systems with limited audit
storage capacity.

    When the remote buffer is full, audit logs will not be collected and sent
to the central log server.

```
New:
```
Information stored in one location is vulnerable to accidental or incidental deletion or alteration.

Off-loading is a common process in information systems with limited audit storage capacity.

When the remote buffer is full, audit logs will not be collected and sent to the central log server.



```
---
V-81021:
Old:
```
Information stored in one location is vulnerable to accidental or
incidental deletion or alteration.

    Off-loading is a common process in information systems with limited audit
storage capacity.

    When audit logs are not labeled before they are sent to a central log
server, the audit data will not be able to be analyzed and tied back to the
correct system.

```
New:
```
Information stored in one location is vulnerable to accidental or incidental deletion or alteration.

Off-loading is a common process in information systems with limited audit storage capacity.

When audit logs are not labeled before they are sent to a central log server, the audit data will not be able to be analyzed and tied back to the correct system.



```
---
V-92251:
Old:
```
Enabling reverse path filtering drops packets with source addresses
that should not have been able to be received on the interface they were
received on. It should not be used on systems which are routers for complicated
networks, but is helpful for end hosts and routers serving small networks.

```
New:
```
Enabling reverse path filtering drops packets with source addresses that should not have been able to be received on the interface they were received on. It should not be used on systems which are routers for complicated networks, but is helpful for end hosts and routers serving small networks.

```
---
V-92253:
Old:
```
Enabling reverse path filtering drops packets with source addresses
that should not have been able to be received on the interface they were
received on. It should not be used on systems which are routers for complicated
networks, but is helpful for end hosts and routers serving small networks.

```
New:
```
Enabling reverse path filtering drops packets with source addresses that should not have been able to be received on the interface they were received on. It should not be used on systems which are routers for complicated networks, but is helpful for end hosts and routers serving small networks.

```
---
V-92255:
Old:
```
Adding host-based intrusion detection tools can provide the capability
to automatically take actions in response to malicious behavior, which can
provide additional agility in reacting to network threats. These tools also
often include a reporting capability to provide network awareness of the
system, which may not otherwise exist in an organization's systems management
regime.

```
New:
```
Adding host-based intrusion detection tools can provide the capability to automatically take actions in response to malicious behavior, which can provide additional agility in reacting to network threats. These tools also often include a reporting capability to provide network awareness of the system, which may not otherwise exist in an organization's systems management regime.

```
---
V-94843:
Old:
```
A locally logged-on user who presses Ctrl-Alt-Delete, when at the
console, can reboot the system. If accidentally pressed, as could happen in the
case of a mixed OS environment, this can create the risk of short-term loss of
availability of systems due to unintentional reboot. In the GNOME graphical
environment, risk of unintentional reboot from the Ctrl-Alt-Delete sequence is
reduced because the user will be prompted before any action is taken.

```
New:
```
A locally logged-on user who presses Ctrl-Alt-Delete, when at the console, can reboot the system. If accidentally pressed, as could happen in the case of a mixed OS environment, this can create the risk of short-term loss of availability of systems due to unintentional reboot. In the graphical environment, risk of unintentional reboot from the Ctrl-Alt-Delete sequence is reduced because the user will be prompted before any action is taken.

```
---
</details>