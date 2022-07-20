## Automattic Update:  -> 

### New Controls:
+   V-100023 - The Red Hat Enterprise Linux operating system must disable the graphical user interface automounter unless required.

### Updated Check/Fixes:
#### Checks:

V-71849:
```
Verify the file permissions, ownership, and group membership of system files and commands match the vendor values.

Check the default file permissions, ownership, and group membership of system files and commands with the following command:

# for i in `rpm -Va | egrep -i '^\.[M|U|G|.]{8}' | cut -d " " -f4,5`;do for j in `rpm -qf $i`;do rpm -ql $j --dump | cut -d " " -f1,5,6,7 | grep $i;done;done

/var/log/gdm 040755 root root
/etc/audisp/audisp-remote.conf 0100640 root root
/usr/bin/passwd 0104755 root root

For each file returned, verify the current permissions, ownership, and group membership:
# ls -la <filename>

-rw-------. 1 root root 133 Jan 11 13:25 /etc/audisp/audisp-remote.conf

If the file is more permissive than the default permissions, this is a finding.

If the file is not owned by the default owner and is not documented with the Information System Security Officer (ISSO), this is a finding.

If the file is not a member of the default group and is not documented with the Information System Security Officer (ISSO), this is a finding.
```


V-71855:
```
Verify the cryptographic hash of system files and commands match the vendor values.

Check the cryptographic hash of system files and commands with the following command:

Note: System configuration files (indicated by a "c" in the second column) are expected to change over time. Unusual modifications should be investigated through the system audit log.

# rpm -Va --noconfig | grep '^..5'

If there is any output from the command for system files or binaries, this is a finding.
```


V-71859:
```
Verify the operating system displays the Standard Mandatory DoD Notice and Consent Banner before granting access to the operating system via a graphical user logon.

Note: If the system does not have GNOME installed, this requirement is Not Applicable. 

Check to see if the operating system displays a banner at the logon screen with the following command:

# grep banner-message-enable /etc/dconf/db/local.d/*
banner-message-enable=true

If "banner-message-enable" is set to "false" or is missing, this is a finding.
```


V-71861:
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


V-71863:
```
Verify the operating system displays the Standard Mandatory DoD Notice and Consent Banner before granting access to the operating system via a command line user logon.

Check to see if the operating system displays a banner at the command line logon screen with the following command:

# more /etc/issue

The command should return the following text:
"You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.

By using this IS (which includes any device attached to this IS), you consent to the following conditions:

-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.

-At any time, the USG may inspect and seize data stored on this IS.

-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.

-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.

-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details."

If the operating system does not display a graphical logon banner or the banner does not match the Standard Mandatory DoD Notice and Consent Banner, this is a finding.

If the text in the "/etc/issue" file does not match the Standard Mandatory DoD Notice and Consent Banner, this is a finding.
```


V-71891:
```
Verify the operating system enables a user's session lock until that user re-establishes access using established identification and authentication procedures. The screen program must be installed to lock sessions on the console.

Note: If the system does not have GNOME installed, this requirement is Not Applicable.

Check to see if the screen lock is enabled with the following command:

# grep -i lock-enabled /etc/dconf/db/local.d/*
lock-enabled=true

If the "lock-enabled" setting is missing or is not set to "true", this is a finding.
```


V-71893:
```
Verify the operating system initiates a screensaver after a 15-minute period of inactivity for graphical user interfaces. The screen program must be installed to lock sessions on the console.

Note: If the system does not have GNOME installed, this requirement is Not Applicable.

Check to see if GNOME is configured to display a screensaver after a 15 minute delay with the following command:

# grep -i idle-delay /etc/dconf/db/local.d/*
idle-delay=uint32 900

If the "idle-delay" setting is missing or is not set to "900" or less, this is a finding.
```


V-71897:
```
Verify the operating system has the screen package installed.

Check to see if the screen package is installed with the following command:

# yum list installed screen
screen-4.3.1-3-x86_64.rpm

If the screen package is not installed, check to see if the tmux package is installed with the following command:

#yum list installed tmux
tmux-1.8-4.el7.x86_64.rpm 

If either the screen package or the tmux package is not installed, this is a finding.
```


V-71899:
```
Verify the operating system initiates a session lock after a 15-minute period of inactivity for graphical user interfaces. The screen program must be installed to lock sessions on the console.

Note: If the system does not have a Graphical User Interface installed, this requirement is Not Applicable.

Check for the session lock settings with the following commands:

# grep -i idle-activation-enabled /etc/dconf/db/local.d/*

idle-activation-enabled=true

If "idle-activation-enabled" is not set to "true", this is a finding.
```


V-71901:
```
Verify the operating system initiates a session lock a for graphical user interfaces when the screensaver is activated. 

Note: If the system does not have GNOME installed, this requirement is Not Applicable. The screen program must be installed to lock sessions on the console.

If GNOME is installed, check to see a session lock occurs when the screensaver is activated with the following command:

# grep -i lock-delay /etc/dconf/db/local.d/*
lock-delay=uint32 5

If the "lock-delay" setting is missing, or is not set to "5" or less, this is a finding.
```


V-71903:
```
Note: The value to require a number of upper-case characters to be set is expressed as a negative number in "/etc/security/pwquality.conf".

Check the value for "ucredit" in "/etc/security/pwquality.conf" with the following command:

# grep ucredit /etc/security/pwquality.conf 
ucredit = -1

If the value of "ucredit" is not set to a negative value, this is a finding.
```


V-71905:
```
Note: The value to require a number of lower-case characters to be set is expressed as a negative number in "/etc/security/pwquality.conf".

Check the value for "lcredit" in "/etc/security/pwquality.conf" with the following command:

# grep lcredit /etc/security/pwquality.conf 
lcredit = -1 

If the value of "lcredit" is not set to a negative value, this is a finding.
```


V-71907:
```
Note: The value to require a number of numeric characters to be set is expressed as a negative number in "/etc/security/pwquality.conf".

Check the value for "dcredit" in "/etc/security/pwquality.conf" with the following command:

# grep dcredit /etc/security/pwquality.conf 
dcredit = -1 

If the value of "dcredit" is not set to a negative value, this is a finding.
```


V-71909:
```
Verify the operating system enforces password complexity by requiring that at least one special character be used.

Note: The value to require a number of special characters to be set is expressed as a negative number in "/etc/security/pwquality.conf".

Check the value for "ocredit" in "/etc/security/pwquality.conf" with the following command:

# grep ocredit /etc/security/pwquality.conf 
ocredit=-1

If the value of "ocredit" is not set to a negative value, this is a finding.
```


V-71911:
```
The "difok" option sets the number of characters in a password that must not be present in the old password.

Check for the value of the "difok" option in "/etc/security/pwquality.conf" with the following command:

# grep difok /etc/security/pwquality.conf 
difok = 8

If the value of "difok" is set to less than "8", this is a finding.
```


V-71913:
```
The "minclass" option sets the minimum number of required classes of characters for the new password (digits, upper-case, lower-case, others).

Check for the value of the "minclass" option in "/etc/security/pwquality.conf" with the following command:

# grep minclass /etc/security/pwquality.conf 
minclass = 4

If the value of "minclass" is set to less than "4", this is a finding.
```


V-71915:
```
The "maxrepeat" option sets the maximum number of allowed same consecutive characters in a new password.

Check for the value of the "maxrepeat" option in "/etc/security/pwquality.conf" with the following command:

# grep maxrepeat /etc/security/pwquality.conf 
maxrepeat = 3

If the value of "maxrepeat" is set to more than "3", this is a finding.
```


V-71917:
```
The "maxclassrepeat" option sets the maximum number of allowed same consecutive characters in the same class in the new password.

Check for the value of the "maxclassrepeat" option in "/etc/security/pwquality.conf" with the following command:

# grep maxclassrepeat /etc/security/pwquality.conf 
maxclassrepeat = 4

If the value of "maxclassrepeat" is set to more than "4", this is a finding.
```


V-71919:
```
Verify the PAM system service is configured to store only encrypted representations of passwords. The strength of encryption that must be used to hash passwords for all accounts is SHA512.

Check that the system is configured to create SHA512 hashed passwords with the following command:

# grep password /etc/pam.d/system-auth /etc/pam.d/password-auth

Outcome should look like following:
/etc/pam.d/system-auth-ac:password    sufficient    pam_unix.so sha512 shadow try_first_pass use_authtok
/etc/pam.d/password-auth:password    sufficient    pam_unix.so sha512 shadow try_first_pass use_authtok

If the "/etc/pam.d/system-auth" and "/etc/pam.d/password-auth" configuration files allow for password hashes other than SHA512 to be used, this is a finding.
```


V-71921:
```
Verify the system's shadow file is configured to store only encrypted representations of passwords. The strength of encryption that must be used to hash passwords for all accounts is SHA512.

Check that the system is configured to create SHA512 hashed passwords with the following command:

# grep -i encrypt /etc/login.defs
ENCRYPT_METHOD SHA512

If the "/etc/login.defs" configuration file does not exist or allows for password hashes other than SHA512 to be used, this is a finding.
```


V-71923:
```
Verify the user and group account administration utilities are configured to store only encrypted representations of passwords. The strength of encryption that must be used to hash passwords for all accounts is "SHA512".

Check that the system is configured to create "SHA512" hashed passwords with the following command:

# grep -i sha512 /etc/libuser.conf 

crypt_style = sha512

If the "crypt_style" variable is not set to "sha512", is not in the defaults section, is commented out, or does not exist, this is a finding.
```


V-71925:
```
Verify the operating system enforces 24 hours/1 day as the minimum password lifetime for new user accounts.

Check for the value of "PASS_MIN_DAYS" in "/etc/login.defs" with the following command: 

# grep -i pass_min_days /etc/login.defs
PASS_MIN_DAYS     1

If the "PASS_MIN_DAYS" parameter value is not "1" or greater, or is commented out, this is a finding.
```


V-71927:
```
Check whether the minimum time period between password changes for each user account is one day or greater.

# awk -F: '$4 < 1 {print $1 " " $4}' /etc/shadow

If any results are returned that are not associated with a system account, this is a finding.
```


V-71929:
```
If passwords are not being used for authentication, this is Not Applicable.

Verify the operating system enforces a 60-day maximum password lifetime restriction for new user accounts.

Check for the value of "PASS_MAX_DAYS" in "/etc/login.defs" with the following command:

# grep -i pass_max_days /etc/login.defs
PASS_MAX_DAYS 60

If the "PASS_MAX_DAYS" parameter value is not 60 or less, or is commented out, this is a finding.
```


V-71931:
```
Check whether the maximum time period for existing passwords is restricted to 60 days.

# awk -F: '$5 > 60 {print $1 " " $5}' /etc/shadow

If any results are returned that are not associated with a system account, this is a finding.
```


V-71933:
```
Verify the operating system prohibits password reuse for a minimum of five generations.

Check for the value of the "remember" argument in "/etc/pam.d/system-auth" and "/etc/pam.d/password-auth" with the following command:

# grep -i remember /etc/pam.d/system-auth /etc/pam.d/password-auth

password    requisite     pam_pwhistory.so use_authtok remember=5 retry=3

If the line containing the "pam_pwhistory.so" line does not have the "remember" module argument set, is commented out, or the value of the "remember" module argument is set to less than "5", this is a finding.
```


V-71935:
```
Verify the operating system enforces a minimum 15-character password length. The "minlen" option sets the minimum number of characters in a new password.

Check for the value of the "minlen" option in "/etc/security/pwquality.conf" with the following command:

# grep minlen /etc/security/pwquality.conf
minlen = 15

If the command does not return a "minlen" value of 15 or greater, this is a finding.
```


V-71937:
```
To verify that null passwords cannot be used, run the following command: 

# grep nullok /etc/pam.d/system-auth /etc/pam.d/password-auth

If this produces any output, it may be possible to log on with accounts with empty passwords.

If null passwords can be used, this is a finding.
```


V-71939:
```
To determine how the SSH daemon's "PermitEmptyPasswords" option is set, run the following command:

# grep -i PermitEmptyPasswords /etc/ssh/sshd_config
PermitEmptyPasswords no

If no line, a commented line, or a line indicating the value "no" is returned, the required value is set.

If the required value is not set, this is a finding.
```


V-71941:
```
If passwords are not being used for authentication, this is Not Applicable.

Verify the operating system disables account identifiers (individuals, groups, roles, and devices) after the password expires with the following command:

# grep -i inactive /etc/default/useradd
INACTIVE=0

If the value is not set to "0", is commented out, or is not defined, this is a finding.
```


V-71943:
```
Check that the system locks an account for a minimum of 15 minutes after three unsuccessful logon attempts within a period of 15 minutes with the following command:

# grep pam_faillock.so /etc/pam.d/password-auth

auth required pam_faillock.so preauth silent audit deny=3 even_deny_root fail_interval=900 unlock_time=900
auth [default=die] pam_faillock.so authfail audit deny=3 even_deny_root fail_interval=900 unlock_time=900
account required pam_faillock.so 

If the "deny" parameter is set to "0" or a value less than "3" on both "auth" lines with the "pam_faillock.so" module, or is missing from these lines, this is a finding.

If the "even_deny_root" parameter is not set on both "auth" lines with the "pam_faillock.so" module, or is missing from these lines, this is a finding.

If the "fail_interval" parameter is set to "0" or is set to a value less than "900" on both "auth" lines with the "pam_faillock.so" module, or is missing from these lines, this is a finding.

If the "unlock_time" parameter is not set to "0", "never", or is set to a value less than "900" on both "auth" lines with the "pam_faillock.so" module, or is missing from these lines, this is a finding.

Note: The maximum configurable value for "unlock_time" is "604800". 

If any line referencing the "pam_faillock.so" module is commented out, this is a finding.

# grep pam_faillock.so /etc/pam.d/system-auth

auth required pam_faillock.so preauth silent audit deny=3 even_deny_root fail_interval=900 unlock_time=900
auth [default=die] pam_faillock.so authfail audit deny=3 even_deny_root fail_interval=900 unlock_time=900
account required pam_faillock.so 

If the "deny" parameter is set to "0" or a value less than "3" on both "auth" lines with the "pam_faillock.so" module, or is missing from these lines, this is a finding.

If the "even_deny_root" parameter is not set on both "auth" lines with the "pam_faillock.so" module, or is missing from these lines, this is a finding.

If the "fail_interval" parameter is set to "0" or is set to a value less than "900" on both "auth" lines with the "pam_faillock.so" module, or is missing from these lines, this is a finding.

If the "unlock_time" parameter is not set to "0", "never", or is set to a value less than "900" on both "auth" lines with the "pam_faillock.so" module or is missing from these lines, this is a finding.

Note: The maximum configurable value for "unlock_time" is "604800". 
If any line referencing the "pam_faillock.so" module is commented out, this is a finding.
```


V-71945:
```
Verify the operating system automatically locks the root account until it is released by an administrator when three unsuccessful logon attempts in 15 minutes are made.

# grep pam_faillock.so /etc/pam.d/password-auth
auth required pam_faillock.so preauth silent audit deny=3 even_deny_root fail_interval=900 unlock_time=900 
auth [default=die] pam_faillock.so authfail audit deny=3 even_deny_root fail_interval=900 unlock_time=900 
account required pam_faillock.so

If the "even_deny_root" setting is not defined on both lines with the "pam_faillock.so" module, is commented out, or is missing from a line, this is a finding.

# grep pam_faillock.so /etc/pam.d/system-auth
auth required pam_faillock.so preauth silent audit deny=3 even_deny_root fail_interval=900 unlock_time=900 
auth [default=die] pam_faillock.so authfail audit deny=3 even_deny_root fail_interval=900 unlock_time=900
account required pam_faillock.so

If the "even_deny_root" setting is not defined on both lines with the "pam_faillock.so" module, is commented out, or is missing from a line, this is a finding.
```


V-71947:
```
If passwords are not being used for authentication, this is Not Applicable.

Verify the operating system requires users to supply a password for privilege escalation.

Check the configuration of the "/etc/sudoers" and "/etc/sudoers.d/*" files with the following command:

# grep -i nopasswd /etc/sudoers /etc/sudoers.d/*

If any uncommented line is found with a "NOPASSWD" tag, this is a finding.
```


V-71949:
```
Verify the operating system requires users to reauthenticate for privilege escalation.

Check the configuration of the "/etc/sudoers" and "/etc/sudoers.d/*" files with the following command:

# grep -i authenticate /etc/sudoers /etc/sudoers.d/*

If any uncommented line is found with a "!authenticate" tag, this is a finding.
```


V-71951:
```
Verify the operating system enforces a delay of at least four seconds between console logon prompts following a failed logon attempt.

Check the value of the "fail_delay" parameter in the "/etc/login.defs" file with the following command:

# grep -i fail_delay /etc/login.defs
FAIL_DELAY 4

If the value of "FAIL_DELAY" is not set to "4" or greater, or the line is commented out, this is a finding.
```


V-71953:
```
Verify the operating system does not allow an unattended or automatic logon to the system via a graphical user interface.

Note: If the system does not have GNOME installed, this requirement is Not Applicable. 

Check for the value of the "AutomaticLoginEnable" in the "/etc/gdm/custom.conf" file with the following command:

# grep -i automaticloginenable /etc/gdm/custom.conf
AutomaticLoginEnable=false

If the value of "AutomaticLoginEnable" is not set to "false", this is a finding.
```


V-71955:
```
Verify the operating system does not allow an unrestricted logon to the system via a graphical user interface.

Note: If the system does not have GNOME installed, this requirement is Not Applicable. 

Check for the value of the "TimedLoginEnable" parameter in "/etc/gdm/custom.conf" file with the following command:

# grep -i timedloginenable /etc/gdm/custom.conf
TimedLoginEnable=false

If the value of "TimedLoginEnable" is not set to "false", this is a finding.
```


V-71957:
```
Verify the operating system does not allow users to override environment variables to the SSH daemon.

Check for the value of the "PermitUserEnvironment" keyword with the following command:

# grep -i permituserenvironment /etc/ssh/sshd_config
PermitUserEnvironment no

If the "PermitUserEnvironment" keyword is not set to "no", is missing, or is commented out, this is a finding.
```


V-71959:
```
Verify the operating system does not allow a non-certificate trusted host SSH logon to the system.

Check for the value of the "HostbasedAuthentication" keyword with the following command:

# grep -i hostbasedauthentication /etc/ssh/sshd_config
HostbasedAuthentication no

If the "HostbasedAuthentication" keyword is not set to "no", is missing, or is commented out, this is a finding.
```


V-71961:
```
For systems that use UEFI, this is Not Applicable.
For systems that are running RHEL 7.2 or newer, this is Not Applicable.

Check to see if an encrypted root password is set. On systems that use a BIOS, use the following command:

# grep -i password_pbkdf2 /boot/grub2/grub.cfg

password_pbkdf2 [superusers-account] [password-hash]

If the root password entry does not begin with "password_pbkdf2", this is a finding.

If the "superusers-account" is not set to "root", this is a finding.
```


V-71963:
```
For systems that use BIOS, this is Not Applicable.
For systems that are running RHEL 7.2 or newer, this is Not Applicable.

Check to see if an encrypted root password is set. On systems that use UEFI, use the following command:

# grep -i password /boot/efi/EFI/redhat/grub.cfg

password_pbkdf2 [superusers-account] [password-hash]

If the root password entry does not begin with "password_pbkdf2", this is a finding.

If the "superusers-account" is not set to "root", this is a finding.
```


V-71965:
```
Verify the operating system requires multifactor authentication to uniquely identify organizational users using multifactor authentication.

Check to see if smartcard authentication is enforced on the system:

# authconfig --test | grep "pam_pkcs11 is enabled"

If no results are returned, this is a finding.

# authconfig --test | grep "smartcard removal action"

If "smartcard removal action" is blank, this is a finding.

# authconfig --test | grep "smartcard module"

If "smartcard module" is blank, this is a finding.
```


V-71967:
```
Check to see if the rsh-server package is installed with the following command:

# yum list installed rsh-server

If the rsh-server package is installed, this is a finding.
```


V-71969:
```
The NIS service provides an unencrypted authentication service that does not provide for the confidentiality and integrity of user passwords or the remote session.

Check to see if the "ypserve" package is installed with the following command:

# yum list installed ypserv

If the "ypserv" package is installed, this is a finding.
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


V-71973:
```
Verify the operating system routinely checks the baseline configuration for unauthorized changes.

Note: A file integrity tool other than Advanced Intrusion Detection Environment (AIDE) may be used, but the tool must be executed at least once per week.

Check to see if AIDE is installed on the system with the following command:

# yum list installed aide

If AIDE is not installed, ask the SA how file integrity checks are performed on the system.

Check for the presence of a cron job running daily or weekly on the system that executes AIDE daily to scan for changes to the system baseline. The command used in the example will use a daily occurrence.

Check the cron directories for a script file controlling the execution of the file integrity application. For example, if AIDE is installed on the system, use the following command:

# ls -al /etc/cron.* | grep aide
-rwxr-xr-x 1 root root 29 Nov 22 2015 aide

# grep aide /etc/crontab /var/spool/cron/root
/etc/crontab: 30 04 * * * /root/aide
/var/spool/cron/root: 30 04 * * * /root/aide

If the file integrity application does not exist, or a script file controlling the execution of the file integrity application does not exist, this is a finding.
```


V-71975:
```
Verify the operating system notifies designated personnel if baseline configurations are changed in an unauthorized manner.

Note: A file integrity tool other than Advanced Intrusion Detection Environment (AIDE) may be used, but the tool must be executed and notify specified individuals via email or an alert.

Check to see if AIDE is installed on the system with the following command:

# yum list installed aide

If AIDE is not installed, ask the SA how file integrity checks are performed on the system. 

Check for the presence of a cron job running routinely on the system that executes AIDE to scan for changes to the system baseline. The commands used in the example will use a daily occurrence.

Check the cron directories for a "crontab" script file controlling the execution of the file integrity application. For example, if AIDE is installed on the system, use the following command:

# ls -al /etc/cron.* | grep aide
-rwxr-xr-x 1 root root 32 Jul 1 2011 aide

# grep aide /etc/crontab /var/spool/cron/root
/etc/crontab: 30 04 * * * /root/aide
/var/spool/cron/root: 30 04 * * * /root/aide

AIDE does not have a configuration that will send a notification, so the cron job uses the mail application on the system to email the results of the file integrity run as in the following example:

# more /etc/cron.daily/aide
#!/bin/bash

/usr/sbin/aide --check | /bin/mail -s "$HOSTNAME - Daily aide integrity check run" root@sysname.mil

If the file integrity application does not notify designated personnel of changes, this is a finding.
```


V-71977:
```
Verify the operating system prevents the installation of patches, service packs, device drivers, or operating system components from a repository without verification that they have been digitally signed using a certificate that is recognized and approved by the organization.

Check that yum verifies the signature of packages from a repository prior to install with the following command:

# grep gpgcheck /etc/yum.conf
gpgcheck=1

If "gpgcheck" is not set to "1", or if options are missing or commented out, ask the System Administrator how the certificates for patches and other operating system components are verified. 

If there is no process to validate certificates that is approved by the organization, this is a finding.
```


V-71979:
```
Verify the operating system prevents the installation of patches, service packs, device drivers, or operating system components of local packages without verification that they have been digitally signed using a certificate that is recognized and approved by the organization.

Check that yum verifies the signature of local packages prior to install with the following command:

# grep localpkg_gpgcheck /etc/yum.conf
localpkg_gpgcheck=1

If "localpkg_gpgcheck" is not set to "1", or if options are missing or commented out, ask the System Administrator how the signatures of local packages and other operating system components are verified. 

If there is no process to validate the signatures of local packages that is approved by the organization, this is a finding.
```


V-71983:
```
If there is an HBSS with a Device Control Module and a Data Loss Prevention mechanism, this requirement is not applicable.

Verify the operating system disables the ability to load the USB Storage kernel module.

# grep -r usb-storage /etc/modprobe.d/* | grep -i "/bin/true" | grep -v "^#"

install usb-storage /bin/true

If the command does not return any output, or the line is commented out, and use of USB Storage is not documented with the Information System Security Officer (ISSO) as an operational requirement, this is a finding.

Verify the operating system disables the ability to use USB mass storage devices.

Check to see if USB mass storage is disabled with the following command:

# grep usb-storage /etc/modprobe.d/* | grep -i "blacklist" | grep -v "^#"
blacklist usb-storage

If the command does not return any output or the output is not "blacklist usb-storage", and use of USB storage devices is not documented with the Information System Security Officer (ISSO) as an operational requirement, this is a finding.
```


V-71985:
```
Verify the operating system disables the ability to automount devices.

Check to see if automounter service is active with the following command:

# systemctl status autofs
autofs.service - Automounts filesystems on demand
   Loaded: loaded (/usr/lib/systemd/system/autofs.service; disabled)
   Active: inactive (dead)

If the "autofs" status is set to "active" and is not documented with the Information System Security Officer (ISSO) as an operational requirement, this is a finding.
```


V-71987:
```
Verify the operating system removes all software components after updated versions have been installed.

Check if yum is configured to remove unneeded packages with the following command:

# grep -i clean_requirements_on_remove /etc/yum.conf
clean_requirements_on_remove=1

If "clean_requirements_on_remove" is not set to "1", "True", or "yes", or is not set in "/etc/yum.conf", this is a finding.
```


V-71989:
```
If an HBSS or HIPS is active on the system, this is Not Applicable.

Verify the operating system verifies correct operation of all security functions.

Check if "SELinux" is active and in "Enforcing" mode with the following command:

# getenforce
Enforcing

If "SELinux" is not active and not in "Enforcing" mode, this is a finding.
```


V-71991:
```
If an HBSS or HIPS is active on the system, this is Not Applicable.

Verify the operating system verifies correct operation of all security functions.

Check if "SELinux" is active and is enforcing the targeted policy with the following command:

# sestatus

SELinux status: enabled

SELinuxfs mount: /selinux

SELinux root directory: /etc/selinux

Loaded policy name: targeted

Current mode: enforcing

Mode from config file: enforcing

Policy MLS status: enabled

Policy deny_unknown status: allowed

Max kernel policy version: 28

If the "Loaded policy name" is not set to "targeted", this is a finding.

Verify that the /etc/selinux/config file is configured to the "SELINUXTYPE" to "targeted":

# grep -i "selinuxtype" /etc/selinux/config | grep -v '^#'

SELINUXTYPE = targeted

If no results are returned or "SELINUXTYPE" is not set to "targeted", this is a finding.
```


V-71993:
```
Verify the operating system is not configured to reboot the system when Ctrl-Alt-Delete is pressed.

Check that the ctrl-alt-del.target is masked and not active with the following command:

# systemctl status ctrl-alt-del.target

ctrl-alt-del.target
Loaded: masked (/dev/null; bad)
Active: inactive (dead)

If the ctrl-alt-del.target is not masked, this is a finding.

If the ctrl-alt-del.target is active, this is a finding.
```


V-71995:
```
Verify the operating system defines default permissions for all authenticated users in such a way that the user can only read and modify their own files.

Check for the value of the "UMASK" parameter in "/etc/login.defs" file with the following command:

Note: If the value of the "UMASK" parameter is set to "000" in "/etc/login.defs" file, the Severity is raised to a CAT I.

# grep -i umask /etc/login.defs
UMASK  077

If the value for the "UMASK" parameter is not "077", or the "UMASK" parameter is missing or is commented out, this is a finding.
```


V-71999:
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


V-72001:
```
Verify all accounts on the system are assigned to an active system, application, or user account.

Obtain the list of authorized system accounts from the Information System Security Officer (ISSO).

Check the system accounts on the system with the following command:

# more /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
games:x:12:100:games:/usr/games:/sbin/nologin
gopher:x:13:30:gopher:/var/gopher:/sbin/nologin

Accounts such as "games" and "gopher" are not authorized accounts as they do not support authorized system functions. 

If the accounts on the system do not match the provided documentation, or accounts that do not support an authorized system function are present, this is a finding.
```


V-72003:
```
Verify all GIDs referenced in the "/etc/passwd" file are defined in the "/etc/group" file.

Check that all referenced GIDs exist with the following command:

# pwck -r

If GIDs referenced in "/etc/passwd" file are returned as not defined in "/etc/group" file, this is a finding.
```


V-72005:
```
Check the system for duplicate UID "0" assignments with the following command:

# awk -F: '$3 == 0 {print $1}' /etc/passwd

If any accounts other than root have a UID of "0", this is a finding.
```


V-72007:
```
Verify all files and directories on the system have a valid owner.

Check the owner of all files and directories with the following command:

Note: The value after -fstype must be replaced with the filesystem type. XFS is used as an example.

# find / -fstype xfs -nouser

If any files on the system do not have an assigned owner, this is a finding.
```


V-72009:
```
Verify all files and directories on the system have a valid group.

Check the owner of all files and directories with the following command:

Note: The value after -fstype must be replaced with the filesystem type. XFS is used as an example.

# find / -fstype xfs -nogroup

If any files on the system do not have an assigned group, this is a finding.
```


V-72011:
```
Verify local interactive users on the system have a home directory assigned.

Check for missing local interactive user home directories with the following command:

# pwck -r
user 'lp': directory '/var/spool/lpd' does not exist
user 'news': directory '/var/spool/news' does not exist
user 'uucp': directory '/var/spool/uucp' does not exist
user 'smithj': directory '/home/smithj' does not exist

Ask the System Administrator (SA) if any users found without home directories are local interactive users. If the SA is unable to provide a response, check for users with a User Identifier (UID) of 1000 or greater with the following command:

# cut -d: -f 1,3 /etc/passwd | egrep ":[1-4][0-9]{2}$|:[0-9]{1,2}$"

If any interactive users do not have a home directory assigned, this is a finding.
```


V-72013:
```
Verify all local interactive users on the system are assigned a home directory upon creation.

Check to see if the system is configured to create home directories for local interactive users with the following command:

# grep -i create_home /etc/login.defs
CREATE_HOME yes

If the value for "CREATE_HOME" parameter is not set to "yes", the line is missing, or the line is commented out, this is a finding.
```


V-72015:
```
Verify the assigned home directory of all local interactive users on the system exists.

Check the home directory assignment for all local interactive non-privileged users on the system with the following command:

# cut -d: -f 1,3,6 /etc/passwd | egrep ":[1-4][0-9]{3}"

smithj:1001:/home/smithj

Note: This may miss interactive users that have been assigned a privileged UID. Evidence of interactive use may be obtained from a number of log files containing system logon information.

Check that all referenced home directories exist with the following command:

# pwck -r
user 'smithj': directory '/home/smithj' does not exist

If any home directories referenced in "/etc/passwd" are returned as not defined, this is a finding.
```


V-72017:
```
Verify the assigned home directory of all local interactive users has a mode of "0750" or less permissive.

Check the home directory assignment for all non-privileged users on the system with the following command:

Note: This may miss interactive users that have been assigned a privileged User Identifier (UID). Evidence of interactive use may be obtained from a number of log files containing system logon information.

# ls -ld $(egrep ':[0-9]{4}' /etc/passwd | cut -d: -f6)
-rwxr-x--- 1 smithj users  18 Mar  5 17:06 /home/smithj

If home directories referenced in "/etc/passwd" do not have a mode of "0750" or less permissive, this is a finding.
```


V-72019:
```
Verify the assigned home directory of all local interactive users on the system exists.

Check the home directory assignment for all local interactive users on the system with the following command:

# ls -ld $(egrep ':[0-9]{4}' /etc/passwd | cut -d: -f6)

-rwxr-x--- 1 smithj users 18 Mar 5 17:06 /home/smithj

If any home directories referenced in "/etc/passwd" are not owned by the interactive user, this is a finding.
```


V-72021:
```
Verify the assigned home directory of all local interactive users is group-owned by that user's primary GID.

Check the home directory assignment for all local interactive users on the system with the following command:

# ls -ld $(egrep ':[0-9]{4}' /etc/passwd | cut -d: -f6)

-rwxr-x--- 1 smithj users 18 Mar 5 17:06 /home/smithj

Check the user's primary group with the following command:

# grep users /etc/group

users:x:250:smithj,jonesj,jacksons

If the user home directory referenced in "/etc/passwd" is not group-owned by that user's primary GID, this is a finding.
```


V-72023:
```
Verify all files and directories in a local interactive user's home directory are owned by the user.

Check the owner of all files and directories in a local interactive user's home directory with the following command:

Note: The example will be for the user "smithj", who has a home directory of "/home/smithj".

# ls -lLR /home/smithj
-rw-r--r-- 1 smithj smithj  18 Mar  5 17:06 file1
-rw-r--r-- 1 smithj smithj 193 Mar  5 17:06 file2
-rw-r--r-- 1 smithj smithj 231 Mar  5 17:06 file3

If any files are found with an owner different than the home directory user, this is a finding.
```


V-72025:
```
Verify all files and directories in a local interactive user home directory are group-owned by a group the user is a member of.

Check the group owner of all files and directories in a local interactive user's home directory with the following command:

Note: The example will be for the user "smithj", who has a home directory of "/home/smithj".

# ls -lLR /<home directory>/<users home directory>/
-rw-r--r-- 1 smithj smithj  18 Mar  5 17:06 file1
-rw-r--r-- 1 smithj smithj 193 Mar  5 17:06 file2
-rw-r--r-- 1 smithj sa        231 Mar  5 17:06 file3

If any files are found with an owner different than the group home directory user, check to see if the user is a member of that group with the following command:

# grep smithj /etc/group
sa:x:100:juan,shelley,bob,smithj 
smithj:x:521:smithj

If the user is not a member of a group that group owns file(s) in a local interactive user's home directory, this is a finding.
```


V-72027:
```
Verify all files and directories contained in a local interactive user home directory, excluding local initialization files, have a mode of "0750".

Check the mode of all non-initialization files in a local interactive user home directory with the following command:

Files that begin with a "." are excluded from this requirement.

Note: The example will be for the user "smithj", who has a home directory of "/home/smithj".

# ls -lLR /home/smithj
-rwxr-x--- 1 smithj smithj  18 Mar  5 17:06 file1
-rwxr----- 1 smithj smithj 193 Mar  5 17:06 file2
-rw-r-x--- 1 smithj smithj 231 Mar  5 17:06 file3

If any files are found with a mode more permissive than "0750", this is a finding.
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


V-72031:
```
Verify the local initialization files of all local interactive users are group-owned by that user's primary Group Identifier (GID).

Check the home directory assignment for all non-privileged users on the system with the following command:

Note: The example will be for the smithj user, who has a home directory of "/home/smithj" and a primary group of "users".

# cut -d: -f 1,4,6 /etc/passwd | egrep ":[1-4][0-9]{3}"
smithj:1000:/home/smithj

# grep 1000 /etc/group
users:x:1000:smithj,jonesj,jacksons 

Note: This may miss interactive users that have been assigned a privileged User Identifier (UID). Evidence of interactive use may be obtained from a number of log files containing system logon information.

Check the group owner of all local interactive user's initialization files with the following command:

# ls -al /home/smithj/.[^.]* | more

-rwxr-xr-x 1 smithj users 896 Mar 10 2011 .profile
-rwxr-xr-x 1 smithj users 497 Jan 6 2007 .login
-rwxr-xr-x 1 smithj users 886 Jan 6 2007 .something

If all local interactive user's initialization files are not group-owned by that user's primary GID, this is a finding.
```


V-72033:
```
Verify that all local initialization files have a mode of "0740" or less permissive.

Check the mode on all local initialization files with the following command:

Note: The example will be for the "smithj" user, who has a home directory of "/home/smithj".

# ls -al /home/smithj/.[^.]* | more

-rwxr----- 1 smithj users 896 Mar 10 2011 .profile
-rwxr----- 1 smithj users 497 Jan 6 2007 .login
-rwxr----- 1 smithj users 886 Jan 6 2007 .something

If any local initialization files have a mode more permissive than "0740", this is a finding.
```


V-72035:
```
Verify that all local interactive user initialization files' executable search path statements do not contain statements that will reference a working directory other than the users' home directory.

Check the executable search path statement for all local interactive user initialization files in the users' home directory with the following commands:

Note: The example will be for the smithj user, which has a home directory of "/home/smithj".

# grep -i path /home/smithj/.*
/home/smithj/.bash_profile:PATH=$PATH:$HOME/.local/bin:$HOME/bin
/home/smithj/.bash_profile:export PATH

If any local interactive user initialization files have executable search path statements that include directories outside of their home directory, this is a finding.
```


V-72037:
```
Verify that local initialization files do not execute world-writable programs.

Check the system for world-writable files with the following command:

# find / -xdev -perm -002 -type f -exec ls -ld {} \; | more

For all files listed, check for their presence in the local initialization files with the following commands:

Note: The example will be for a system that is configured to create users' home directories in the "/home" directory.

# grep <file> /home/*/.*

If any local initialization files are found to reference world-writable files, this is a finding.
```


V-72039:
```
Verify that all system device files are correctly labeled to prevent unauthorized modification.

List all device files on the system that are incorrectly labeled with the following commands:

Note: Device files are normally found under "/dev", but applications may place device files in other directories and may necessitate a search of the entire system.

#find /dev -context *:device_t:* \( -type c -o -type b \) -printf "%p %Z\n"

#find /dev -context *:unlabeled_t:* \( -type c -o -type b \) -printf "%p %Z\n"

Note: There are device files, such as "/dev/vmci", that are used when the operating system is a host virtual machine. They will not be owned by a user on the system and require the "device_t" label to operate. These device files are not a finding.

If there is output from either of these commands, other than already noted, this is a finding.
```


V-72041:
```
Verify file systems that contain user home directories are mounted with the "nosuid" option.

Find the file system(s) that contain the user home directories with the following command:

Note: If a separate file system has not been created for the user home directories (user home directories are mounted under "/"), this is not a finding as the "nosuid" option cannot be used on the "/" system.

# cut -d: -f 1,3,6 /etc/passwd | egrep ":[1-4][0-9]{3}"
smithj:1001:/home/smithj
thomasr:1002:/home/thomasr

Check the file systems that are mounted at boot time with the following command:

# more /etc/fstab

UUID=a411dc99-f2a1-4c87-9e05-184977be8539 /home   ext4   rw,relatime,discard,data=ordered,nosuid 0 2
                                                            
If a file system found in "/etc/fstab" refers to the user home directory file system and it does not have the "nosuid" option set, this is a finding.
```


V-72043:
```
Verify file systems that are used for removable media are mounted with the "nosuid" option.

Check the file systems that are mounted at boot time with the following command:

# more /etc/fstab

UUID=2bc871e4-e2a3-4f29-9ece-3be60c835222 /mnt/usbflash vfat noauto,owner,ro,nosuid 0 0

If a file system found in "/etc/fstab" refers to removable media and it does not have the "nosuid" option set, this is a finding.
```


V-72045:
```
Verify file systems that are being NFS imported are configured with the "nosuid" option.

Find the file system(s) that contain the directories being exported with the following command:

# more /etc/fstab | grep nfs

UUID=e06097bb-cfcd-437b-9e4d-a691f5662a7d /store nfs rw,nosuid 0 0

If a file system found in "/etc/fstab" refers to NFS and it does not have the "nosuid" option set, this is a finding.

Verify the NFS is mounted with the "nosuid" option:

# mount | grep nfs | grep nosuid
If no results are returned, this is a finding.
```


V-72047:
```
Verify all world-writable directories are group-owned by root, sys, bin, or an application group.

Check the system for world-writable directories with the following command:

Note: The value after -fstype must be replaced with the filesystem type. XFS is used as an example.

# find / -xdev -perm -002 -type d -fstype xfs -exec ls -lLd {} \;
drwxrwxrwt 2 root root 40 Aug 26 13:07 /dev/mqueue
drwxrwxrwt 2 root root 220 Aug 26 13:23 /dev/shm
drwxrwxrwt 14 root root 4096 Aug 26 13:29 /tmp

If any world-writable directories are not owned by root, sys, bin, or an application group associated with the directory, this is a finding.
```


V-72049:
```
Verify that the default umask for all local interactive users is "077".

Identify the locations of all local interactive user home directories by looking at the "/etc/passwd" file.

Check all local interactive user initialization files for interactive users with the following command:

Note: The example is for a system that is configured to create users home directories in the "/home" directory.

# grep -i umask /home/*/.*

If any local interactive user initialization files are found to have a umask statement that has a value less restrictive than "077", this is a finding.
```


V-72051:
```
Verify that "rsyslog" is configured to log cron events.

Check the configuration of "/etc/rsyslog.conf" or "/etc/rsyslog.d/*.conf" files for the cron facility with the following command:

Note: If another logging package is used, substitute the utility configuration file for "/etc/rsyslog.conf" or "/etc/rsyslog.d/*.conf" files.

# grep cron /etc/rsyslog.conf  /etc/rsyslog.d/*.conf
cron.* /var/log/cron.log

If the command does not return a response, check for cron logging all facilities by inspecting the "/etc/rsyslog.conf" or "/etc/rsyslog.d/*.conf" files.

Look for the following entry:

*.* /var/log/messages

If "rsyslog" is not logging messages for the cron facility or all facilities, this is a finding.
```


V-72053:
```
Verify that the "cron.allow" file is owned by root.

Check the owner of the "cron.allow" file with the following command:

# ls -al /etc/cron.allow
-rw------- 1 root root 6 Mar  5  2011 /etc/cron.allow

If the "cron.allow" file exists and has an owner other than root, this is a finding.
```


V-72055:
```
Verify that the "cron.allow" file is group-owned by root.

Check the group owner of the "cron.allow" file with the following command:

# ls -al /etc/cron.allow
-rw------- 1 root root 6 Mar  5  2011 /etc/cron.allow

If the "cron.allow" file exists and has a group owner other than root, this is a finding.
```


V-72057:
```
Verify that kernel core dumps are disabled unless needed.

Check the status of the "kdump" service with the following command:

# systemctl status kdump.service
kdump.service - Crash recovery kernel arming
   Loaded: loaded (/usr/lib/systemd/system/kdump.service; enabled)
   Active: active (exited) since Wed 2015-08-26 13:08:09 EDT; 43min ago
 Main PID: 1130 (code=exited, status=0/SUCCESS)
kernel arming.

If the "kdump" service is active, ask the System Administrator if the use of the service is required and documented with the Information System Security Officer (ISSO).

If the service is active and is not documented, this is a finding.
```


V-72059:
```
Verify that a separate file system/partition has been created for non-privileged local interactive user home directories.

Check the home directory assignment for all non-privileged users (those with a UID greater than 1000) on the system with the following command:

#cut -d: -f 1,3,6,7 /etc/passwd | egrep ":[1-4][0-9]{3}" | tr ":" "\t"

adamsj /home/adamsj /bin/bash
jacksonm /home/jacksonm /bin/bash
smithj /home/smithj /bin/bash

The output of the command will give the directory/partition that contains the home directories for the non-privileged users on the system (in this example, /home) and users' shell. All accounts with a valid shell (such as /bin/bash) are considered interactive users.

Check that a file system/partition has been created for the non-privileged interactive users with the following command:

Note: The partition of /home is used in the example.

# grep /home /etc/fstab
UUID=333ada18    /home                   ext4    noatime,nobarrier,nodev  1 2

If a separate entry for the file system/partition that contains the non-privileged interactive users' home directories does not exist, this is a finding.
```


V-72061:
```
Verify that a separate file system/partition has been created for "/var".

Check that a file system/partition has been created for "/var" with the following command:

# grep /var /etc/fstab
UUID=c274f65f    /var                    ext4    noatime,nobarrier        1 2

If a separate entry for "/var" is not in use, this is a finding.
```


V-72063:
```
Determine if the operating system is configured to have the "/var/log/audit" path is on a separate file system.

# grep /var/log/audit /etc/fstab

If no result is returned, or the operating system is not configured to have "/var/log/audit" on a separate file system, this is a finding.

Verify that "/var/log/audit" is mounted on a separate file system:

# mount | grep "/var/log/audit"

If no result is returned, or "/var/log/audit" is not on a separate file system, this is a finding.
```


V-72065:
```
Verify that a separate file system/partition has been created for "/tmp".

Check that a file system/partition has been created for "/tmp" with the following command:

# systemctl is-enabled tmp.mount
enabled

If the "tmp.mount" service is not enabled, check to see if "/tmp" is defined in the fstab with a device and mount point:

# grep -i /tmp /etc/fstab
UUID=a411dc99-f2a1-4c87-9e05-184977be8539 /tmp   ext4   rw,relatime,discard,data=ordered,nosuid,noexec, 0 0

If "tmp.mount" service is not enabled and the "/tmp" directory is not defined in the fstab with a device and mount point, this is a finding.
```


V-72067:
```
Verify the operating system implements DoD-approved encryption to protect the confidentiality of remote access sessions.

Check to see if the "dracut-fips" package is installed with the following command:

# yum list installed dracut-fips

dracut-fips-033-360.el7_2.x86_64.rpm

If a "dracut-fips" package is installed, check to see if the kernel command line is configured to use FIPS mode with the following command:

Note: GRUB 2 reads its configuration from the "/boot/grub2/grub.cfg" file on traditional BIOS-based machines and from the "/boot/efi/EFI/redhat/grub.cfg" file on UEFI machines.

# grep fips /boot/grub2/grub.cfg
/vmlinuz-3.8.0-0.40.el7.x86_64 root=/dev/mapper/rhel-root ro rd.md=0 rd.dm=0 rd.lvm.lv=rhel/swap crashkernel=auto rd.luks=0 vconsole.keymap=us rd.lvm.lv=rhel/root rhgb fips=1 quiet

If the kernel command line is configured to use FIPS mode, check to see if the system is in FIPS mode with the following command:

# cat /proc/sys/crypto/fips_enabled 
1

If a "dracut-fips" package is not installed, the kernel command line does not have a fips entry, or the system has a value of "0" for "fips_enabled" in "/proc/sys/crypto", this is a finding.
```


V-72069:
```
Verify the file integrity tool is configured to verify ACLs.

Check to see if Advanced Intrusion Detection Environment (AIDE) is installed on the system with the following command:

# yum list installed aide

If AIDE is not installed, ask the System Administrator how file integrity checks are performed on the system. 

If there is no application installed to perform file integrity checks, this is a finding.

Note: AIDE is highly configurable at install time. These commands assume the "aide.conf" file is under the "/etc" directory. 

Use the following command to determine if the file is in another location:

# find / -name aide.conf

Check the "aide.conf" file to determine if the "acl" rule has been added to the rule list being applied to the files and directories selection lists.

An example rule that includes the "acl" rule is below:

All= p+i+n+u+g+s+m+S+sha512+acl+xattrs+selinux
/bin All # apply the custom rule to the files in bin 
/sbin All # apply the same custom rule to the files in sbin 

If the "acl" rule is not being used on all uncommented selection lines in the "/etc/aide.conf" file, or ACLs are not being checked by another file integrity tool, this is a finding.
```


V-72071:
```
Verify the file integrity tool is configured to verify extended attributes.

Check to see if Advanced Intrusion Detection Environment (AIDE) is installed on the system with the following command:

# yum list installed aide

If AIDE is not installed, ask the System Administrator how file integrity checks are performed on the system.

If there is no application installed to perform file integrity checks, this is a finding.

Note: AIDE is highly configurable at install time. These commands assume the "aide.conf" file is under the "/etc" directory.

Use the following command to determine if the file is in another location:

# find / -name aide.conf

Check the "aide.conf" file to determine if the "xattrs" rule has been added to the rule list being applied to the files and directories selection lists.

An example rule that includes the "xattrs" rule follows:

All= p+i+n+u+g+s+m+S+sha512+acl+xattrs+selinux
/bin All # apply the custom rule to the files in bin 
/sbin All # apply the same custom rule to the files in sbin 

If the "xattrs" rule is not being used on all uncommented selection lines in the "/etc/aide.conf" file, or extended attributes are not being checked by another file integrity tool, this is a finding.
```


V-72073:
```
Verify the file integrity tool is configured to use FIPS 140-2 approved cryptographic hashes for validating file contents and directories.

Note: If RHEL-07-021350 is a finding, this is automatically a finding too as the system cannot implement FIPS 140-2 approved cryptographic algorithms and hashes.

Check to see if Advanced Intrusion Detection Environment (AIDE) is installed on the system with the following command:

# yum list installed aide

If AIDE is not installed, ask the System Administrator how file integrity checks are performed on the system. 

If there is no application installed to perform file integrity checks, this is a finding.

Note: AIDE is highly configurable at install time. These commands assume the "aide.conf" file is under the "/etc" directory. 

Use the following command to determine if the file is in another location:

# find / -name aide.conf

Check the "aide.conf" file to determine if the "sha512" rule has been added to the rule list being applied to the files and directories selection lists.

An example rule that includes the "sha512" rule follows:

All=p+i+n+u+g+s+m+S+sha512+acl+xattrs+selinux
/bin All # apply the custom rule to the files in bin 
/sbin All # apply the same custom rule to the files in sbin 

If the "sha512" rule is not being used on all uncommented selection lines in the "/etc/aide.conf" file, or another file integrity tool is not using FIPS 140-2 approved cryptographic hashes for validating file contents and directories, this is a finding.
```


V-72075:
```
Verify the system is not configured to use a boot loader on removable media.

Note: GRUB 2 reads its configuration from the "/boot/grub2/grub.cfg" file on traditional BIOS-based machines and from the "/boot/efi/EFI/redhat/grub.cfg" file on UEFI machines.

Check for the existence of alternate boot loader configuration files with the following command:

# find / -name grub.cfg
/boot/grub2/grub.cfg

If a "grub.cfg" is found in any subdirectories other than "/boot/grub2" and "/boot/efi/EFI/redhat", ask the System Administrator if there is documentation signed by the ISSO to approve the use of removable media as a boot loader. 

Check that the grub configuration file has the set root command in each menu entry with the following commands:

# grep -c menuentry /boot/grub2/grub.cfg
1
# grep 'set root' /boot/grub2/grub.cfg
set root=(hd0,1)

If the system is using an alternate boot loader on removable media, and documentation does not exist approving the alternate configuration, this is a finding.
```


V-72077:
```
Verify the operating system is configured to disable non-essential capabilities. The most secure way of ensuring a non-essential capability is disabled is to not have the capability installed.

The telnet service provides an unencrypted remote access service that does not provide for the confidentiality and integrity of user passwords or the remote session.

If a privileged user were to log on using this service, the privileged user password could be compromised. 

Check to see if the telnet-server package is installed with the following command:

# yum list installed telnet-server

If the telnet-server package is installed, this is a finding.
```


V-72079:
```
Verify the operating system produces audit records containing information to establish when (date and time) the events occurred.

Check to see if auditing is active by issuing the following command:

# systemctl is-active auditd.service
active

If the "auditd" status is not active, this is a finding.
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


V-72083:
```
Verify the operating system off-loads audit records onto a different system or media from the system being audited.

To determine the remote server that the records are being sent to, use the following command:

# grep -i remote_server /etc/audisp/audisp-remote.conf
remote_server = 10.0.21.1

If a remote server is not configured, or the line is commented out, ask the System Administrator to indicate how the audit logs are off-loaded to a different system or media. 

If there is no evidence that the audit logs are being off-loaded to another system or media, this is a finding.
```


V-72085:
```
Verify the operating system encrypts audit records off-loaded onto a different system or media from the system being audited.

To determine if the transfer is encrypted, use the following command:

# grep -i enable_krb5 /etc/audisp/audisp-remote.conf
enable_krb5 = yes

If the value of the "enable_krb5" option is not set to "yes" or the line is commented out, ask the System Administrator to indicate how the audit logs are off-loaded to a different system or media. 

If there is no evidence that the transfer of the audit logs being off-loaded to another system or media is encrypted, this is a finding.
```


V-72087:
```
Verify the action the operating system takes if the disk the audit records are written to becomes full.

To determine the action that takes place if the disk is full on the remote server, use the following command:

# grep -i disk_full_action /etc/audisp/audisp-remote.conf
disk_full_action = single

If the value of the "disk_full_action" option is not "syslog", "single", or "halt", or the line is commented out, this is a finding.
```


V-72089:
```
Verify the operating system initiates an action to notify the SA and ISSO (at a minimum) when allocated audit record storage volume reaches 75 percent of the repository maximum audit record storage capacity.

Check the system configuration to determine the partition the audit records are being written to with the following command:

# grep -iw log_file /etc/audit/auditd.conf
log_file = /var/log/audit/audit.log

Check the size of the partition that audit records are written to (with the example being "/var/log/audit/"):

# df -h /var/log/audit/
0.9G /var/log/audit

If the audit records are not being written to a partition specifically created for audit records (in this example "/var/log/audit" is a separate partition), determine the amount of space other files in the partition are currently occupying with the following command:

# du -sh <partition>
1.8G /var

Determine what the threshold is for the system to take action when 75 percent of the repository maximum audit record storage capacity is reached:

# grep -iw space_left /etc/audit/auditd.conf
space_left = 225 

If the value of the "space_left" keyword is not set to 25 percent of the total partition size, this is a finding.
```


V-72091:
```
Verify the operating system immediately notifies the SA and ISSO (at a minimum) via email when the allocated audit record storage volume reaches 75 percent of the repository maximum audit record storage capacity.

Check what action the operating system takes when the threshold for the repository maximum audit record storage capacity is reached with the following command:

# grep -i space_left_action  /etc/audit/auditd.conf
space_left_action = email

If the value of the "space_left_action" keyword is not set to "email", this is a finding.
```


V-72093:
```
Verify the operating system immediately notifies the SA and ISSO (at a minimum) via email when the threshold for the repository maximum audit record storage capacity is reached.

Check what account the operating system emails when the threshold for the repository maximum audit record storage capacity is reached with the following command:

# grep -i action_mail_acct  /etc/audit/auditd.conf
action_mail_acct = root

If the value of the "action_mail_acct" keyword is not set to "root" and other accounts for security personnel, this is a finding.
```


V-72095:
```
Verify the operating system audits the execution of privileged functions using the following command:

# grep -iw execve /etc/audit/audit.rules

-a always,exit -F arch=b32 -S execve -C uid!=euid -F euid=0 -k setuid
-a always,exit -F arch=b64 -S execve -C uid!=euid -F euid=0 -k setuid
-a always,exit -F arch=b32 -S execve -C gid!=egid -F egid=0 -k setgid
-a always,exit -F arch=b64 -S execve -C gid!=egid -F egid=0 -k setgid


If both the "b32" and "b64" audit rules for "SUID" files are not defined, this is a finding.

If both the "b32" and "b64" audit rules for "SGID" files are not defined, this is a finding.
```


V-72097:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "chown" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw chown /etc/audit/audit.rules

-a always,exit -F arch=b32 -S chown -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S chown -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "chown" syscall, this is a finding.
```


V-72099:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "fchown" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw fchown /etc/audit/audit.rules

-a always,exit -F arch=b32 -S fchown -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S fchown -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "fchown" syscall, this is a finding.
```


V-72101:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "lchown" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw lchown /etc/audit/audit.rules

-a always,exit -F arch=b32 -S lchown -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S lchown -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "lchown" syscall, this is a finding.
```


V-72103:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "fchownat" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw fchownat /etc/audit/audit.rules

-a always,exit -F arch=b32 -S fchownat -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S fchownat -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "fchownat" syscall, this is a finding.
```


V-72105:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "chmod" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following command:

# grep -iw chmod /etc/audit/audit.rules

-a always,exit -F arch=b32 -S chmod -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S chmod -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "chmod" syscall, this is a finding.
```


V-72107:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "fchmod" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following command:

# grep -iw fchmod /etc/audit/audit.rules

-a always,exit -F arch=b32 -S fchmod -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S fchmod -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "fchmod" syscall, this is a finding.
```


V-72109:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "fchmodat" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following command:

# grep -iw fchmodat /etc/audit/audit.rules

-a always,exit -F arch=b32 -S fchmodat -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S fchmodat -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "fchmodat" syscall, this is a finding.
```


V-72111:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "setxattr" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw setxattr /etc/audit/audit.rules

-a always,exit -F arch=b32 -S setxattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S setxattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "setxattr" syscall, this is a finding.
```


V-72113:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "fsetxattr" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw fsetxattr /etc/audit/audit.rules

-a always,exit -F arch=b32 -S fsetxattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S fsetxattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "fsetxattr" syscall, this is a finding.
```


V-72115:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "lsetxattr" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw lsetxattr /etc/audit/audit.rules

-a always,exit -F arch=b32 -S lsetxattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S lsetxattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "lsetxattr" syscall, this is a finding.
```


V-72117:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "removexattr" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw removexattr /etc/audit/audit.rules

-a always,exit -F arch=b32 -S removexattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S removexattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "removexattr" syscall, this is a finding.
```


V-72119:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "fremovexattr" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw fremovexattr /etc/audit/audit.rules

-a always,exit -F arch=b32 -S fremovexattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S fremovexattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "fremovexattr" syscall, this is a finding.
```


V-72121:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "lremovexattr" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw lremovexattr /etc/audit/audit.rules

-a always,exit -F arch=b32 -S lremovexattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

-a always,exit -F arch=b64 -S lremovexattr -F auid>=1000 -F auid!=4294967295 -k perm_mod

If both the "b32" and "b64" audit rules are not defined for the "lremovexattr" syscall, this is a finding.
```


V-72123:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "creat" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw creat /etc/audit/audit.rules

-a always,exit -F arch=b32 -S creat F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b32 -S creat -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S creat -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S creat -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

If both the "b32" and "b64" audit rules are not defined for the "creat" syscall, this is a finding.

If the output does not produce rules containing "-F exit=-EPERM", this is a finding.

If the output does not produce rules containing "-F exit=-EACCES", this is a finding.
```


V-72125:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "open" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw open /etc/audit/audit.rules

-a always,exit -F arch=b32 -S open -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b32 -S open -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S open -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S open -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

If both the "b32" and "b64" audit rules are not defined for the "open" syscall, this is a finding.

If the output does not produce rules containing "-F exit=-EPERM", this is a finding.

If the output does not produce rules containing "-F exit=-EACCES", this is a finding.
```


V-72127:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "openat" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw openat /etc/audit/audit.rules

-a always,exit -F arch=b32 -S openat -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b32 -S openat -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S openat -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S openat -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

If both the "b32" and "b64" audit rules are not defined for the "openat" syscall, this is a finding.

If the output does not produce rules containing "-F exit=-EPERM", this is a finding.

If the output does not produce rules containing "-F exit=-EACCES", this is a finding.
```


V-72129:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "open_by_handle_at" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw open_by_handle_at /etc/audit/audit.rules

-a always,exit -F arch=b32 -S open_by_handle_at -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b32 -S open_by_handle_at -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S open_by_handle_at -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S open_by_handle_at -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

If both the "b32" and "b64" audit rules are not defined for the "open_by_handle_at" syscall, this is a finding.

If the output does not produce rules containing "-F exit=-EPERM", this is a finding.

If the output does not produce rules containing "-F exit=-EACCES", this is a finding.
```


V-72131:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "truncate" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw truncate /etc/audit/audit.rules

-a always,exit -F arch=b32 -S truncate -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b32 -S truncate -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S truncate -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S truncate -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

If both the "b32" and "b64" audit rules are not defined for the "truncate" syscall, this is a finding.

If the output does not produce rules containing "-F exit=-EPERM", this is a finding.

If the output does not produce rules containing "-F exit=-EACCES", this is a finding.
```


V-72133:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "ftruncate" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw ftruncate /etc/audit/audit.rules

-a always,exit -F arch=b32 -S ftruncate -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b32 -S ftruncate -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S ftruncate -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -k access

-a always,exit -F arch=b64 -S ftruncate -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access

If both the "b32" and "b64" audit rules are not defined for the "ftruncate" syscall, this is a finding.

If the output does not produce rules containing "-F exit=-EPERM", this is a finding.

If the output does not produce rules containing "-F exit=-EACCES", this is a finding.
```


V-72135:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "semanage" command occur.

Check the file system rule in "/etc/audit/audit.rules" with the following command:

# grep -i /usr/sbin/semanage /etc/audit/audit.rules

-a always,exit -F path=/usr/sbin/semanage -F auid>=1000 -F auid!=4294967295 -k privileged-priv_change

If the command does not return any output, this is a finding.
```


V-72137:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "setsebool" command occur.

Check the file system rule in "/etc/audit/audit.rules" with the following command:

# grep -i /usr/sbin/setsebool /etc/audit/audit.rules

-a always,exit -F path=/usr/sbin/setsebool -F auid>=1000 -F auid!=4294967295 -k privileged-priv_change

If the command does not return any output, this is a finding.
```


V-72139:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "chcon" command occur.

Check the file system rule in "/etc/audit/audit.rules" with the following command:

# grep -i /usr/bin/chcon /etc/audit/audit.rules

-a always,exit -F path=/usr/bin/chcon -F auid>=1000 -F auid!=4294967295 -k privileged-priv_change

If the command does not return any output, this is a finding.
```


V-72141:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "setfiles" command occur.

Check the file system rule in "/etc/audit/audit.rules" with the following command:

# grep -iw /usr/sbin/setfiles /etc/audit/audit.rules

-a always,exit -F path=/usr/sbin/setfiles -F auid>=1000 -F auid!=4294967295 -k privileged-priv_change

If the command does not return any output, this is a finding.
```


V-72145:
```
Verify the operating system generates audit records when unsuccessful account access events occur. 

Check the file system rule in "/etc/audit/audit.rules" with the following commands: 

# grep -i /var/run/faillock /etc/audit/audit.rules

-w /var/run/faillock -p wa -k logins

If the command does not return any output, this is a finding.
```


V-72147:
```
Verify the operating system generates audit records when successful account access events occur. 

Check the file system rules in "/etc/audit/audit.rules" with the following commands: 

# grep -i /var/log/lastlog /etc/audit/audit.rules

-w /var/log/lastlog -p wa -k logins 

If the command does not return any output, this is a finding.
```


V-72149:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "passwd" command occur.

Check the file system rule in "/etc/audit/audit.rules" with the following command:

# grep -i /usr/bin/passwd /etc/audit/audit.rules

-a always,exit -F path=/usr/bin/passwd -F auid>=1000 -F auid!=4294967295 -k privileged-passwd

If the command does not return any output, this is a finding.
```


V-72151:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "unix_chkpwd" command occur.

Check the file system rule in "/etc/audit/audit.rules" with the following command:

# grep -iw /usr/sbin/unix_chkpwd /etc/audit/audit.rules

-a always,exit -F path=/usr/sbin/unix_chkpwd -F auid>=1000 -F auid!=4294967295 -k privileged-passwd

If the command does not return any output, this is a finding.
```


V-72153:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "gpasswd" command occur.

Check the file system rule in "/etc/audit/audit.rules" with the following command:

# grep -i /usr/bin/gpasswd /etc/audit/audit.rules

-a always,exit -F path=/usr/bin/gpasswd -F auid>=1000 -F auid!=4294967295 -k privileged-passwd

If the command does not return any output, this is a finding.
```


V-72155:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "chage" command occur.

Check the file system rule in "/etc/audit/audit.rules" with the following command:

# grep -i /usr/bin/chage /etc/audit/audit.rules

-a always,exit -F path=/usr/bin/chage -F auid>=1000 -F auid!=4294967295 -k privileged-passwd

If the command does not return any output, this is a finding.
```


V-72157:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "userhelper" command occur.

Check the file system rule in "/etc/audit/audit.rules" with the following command:

# grep -i /usr/sbin/userhelper /etc/audit/audit.rules

-a always,exit -F path=/usr/sbin/userhelper -F auid>=1000 -F auid!=4294967295 -k privileged-passwd

If the command does not return any output, this is a finding.
```


V-72159:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "su" command occur.

Check that the following system call is being audited by performing the following command to check the file system rules in "/etc/audit/audit.rules": 

# grep -iw /usr/bin/su /etc/audit/audit.rules

-a always,exit -F path=/usr/bin/su -F auid>=1000 -F auid!=4294967295 -k privileged-priv_change

If the command does not return any output, this is a finding.
```


V-72161:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "sudo" command occur.

Check that the following system call is being audited by performing the following command to check the file system rules in "/etc/audit/audit.rules": 

# grep -iw /usr/bin/sudo /etc/audit/audit.rules

-a always,exit -F path=/usr/bin/sudo -F auid>=1000 -F auid!=4294967295 -k privileged-priv_change

If the command does not return any output, this is a finding.
```


V-72163:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to access the "/etc/sudoers" file and files in the "/etc/sudoers.d/" directory. 

Check for modification of the following files being audited by performing the following commands to check the file system rules in "/etc/audit/audit.rules": 

# grep -i "/etc/sudoers" /etc/audit/audit.rules

-w /etc/sudoers -p wa -k privileged-actions

# grep -i "/etc/sudoers.d/" /etc/audit/audit.rules

-w /etc/sudoers.d/ -p wa -k privileged-actions

If the commands do not return output that match the examples, this is a finding.
```


V-72165:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "newgrp" command occur.

Check that the following system call is being audited by performing the following command to check the file system rules in "/etc/audit/audit.rules": 

# grep -i /usr/bin/newgrp /etc/audit/audit.rules

-a always,exit -F path=/usr/bin/newgrp -F auid>=1000 -F auid!=4294967295 -k privileged-priv_change

If the command does not return any output, this is a finding.
```


V-72167:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "chsh" command occur.

Check that the following system call is being audited by performing the following command to check the file system rules in "/etc/audit/audit.rules": 

# grep -i /usr/bin/chsh /etc/audit/audit.rules

-a always,exit -F path=/usr/bin/chsh -F auid>=1000 -F auid!=4294967295 -k privileged-priv_change

If the command does not return any output, this is a finding.
```


V-72171:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "mount" command and syscall occur.

Check that the following system call is being audited by performing the following series of commands to check the file system rules in "/etc/audit/audit.rules": 

# grep -iw "mount" /etc/audit/audit.rules

-a always,exit -F arch=b32 -S mount -F auid>=1000 -F auid!=4294967295 -k privileged-mount
-a always,exit -F arch=b64 -S mount -F auid>=1000 -F auid!=4294967295 -k privileged-mount
-a always,exit -F path=/usr/bin/mount -F auid>=1000 -F auid!=4294967295 -k privileged-mount

If both the "b32" and "b64" audit rules are not defined for the "mount" syscall, this is a finding.

If all uses of the "mount" command are not being audited, this is a finding.
```


V-72173:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "umount" command occur.

Check that the following system call is being audited by performing the following series of commands to check the file system rules in "/etc/audit/audit.rules": 

# grep -iw "/usr/bin/umount" /etc/audit/audit.rules

-a always,exit -F path=/usr/bin/umount -F auid>=1000 -F auid!=4294967295 -k privileged-mount 

If the command does not return any output, this is a finding.
```


V-72175:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "postdrop" command occur.

Check that the following system call is being audited by performing the following command to check the file system rules in "/etc/audit/audit.rules": 

# grep -iw /usr/sbin/postdrop /etc/audit/audit.rules

-a always,exit -F path=/usr/sbin/postdrop -F auid>=1000 -F auid!=4294967295 -k privileged-postfix

If the command does not return any output, this is a finding.
```


V-72177:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "postqueue" command occur. 

Check that the following system call is being audited by performing the following command to check the file system rules in "/etc/audit/audit.rules": 

# grep -iw /usr/sbin/postqueue /etc/audit/audit.rules

-a always,exit -F path=/usr/sbin/postqueue -F auid>=1000 -F auid!=4294967295 -k privileged-postfix

If the command does not return any output, this is a finding.
```


V-72179:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "ssh-keysign" command occur. 

Check that the following system call is being audited by performing the following command to check the file system rules in "/etc/audit/audit.rules": 

# grep -iw /usr/libexec/openssh/ssh-keysign /etc/audit/audit.rules

-a always,exit -F path=/usr/libexec/openssh/ssh-keysign -F auid>=1000 -F auid!=4294967295 -k privileged-ssh

If the command does not return any output, this is a finding.
```


V-72183:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "crontab" command occur. 

Check that the following system call is being audited by performing the following command to check the file system rules in "/etc/audit/audit.rules": 

# grep -iw /usr/bin/crontab /etc/audit/audit.rules

-a always,exit -F path=/usr/bin/crontab -F auid>=1000 -F auid!=4294967295 -k privileged-cron

If the command does not return any output, this is a finding.
```


V-72185:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "pam_timestamp_check" command occur. 

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep -iw "/usr/sbin/pam_timestamp_check" /etc/audit/audit.rules

-a always,exit -F path=/usr/sbin/pam_timestamp_check -F auid>=1000 -F auid!=4294967295 -k privileged-pam 

If the command does not return any output, this is a finding.
```


V-72187:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "init_module" syscall occur. 

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep -iw init_module /etc/audit/audit.rules 

-a always,exit -F arch=b32 -S init_module -k module-change

-a always,exit -F arch=b64 -S init_module -k module-change

If both the "b32" and "b64" audit rules are not defined for the "init_module" syscall, this is a finding.
```


V-72189:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "delete_module" syscall occur. 

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep -iw delete_module /etc/audit/audit.rules

-a always,exit -F arch=b32 -S delete_module -k module-change

-a always,exit -F arch=b64 -S delete_module -k module-change

If both the "b32" and "b64" audit rules are not defined for the "delete_module" syscall, this is a finding.
```


V-72191:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "kmod" command occur. 

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep -iw kmod /etc/audit/audit.rules

-w /usr/bin/kmod -p x -F auid!=4294967295 -k module-change

If the command does not return any output, this is a finding.
```


V-72197:
```
Verify the operating system must generate audit records for all account creations, modifications, disabling, and termination events that affect "/etc/passwd".

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep /etc/passwd /etc/audit/audit.rules

-w /etc/passwd -p wa -k identity

If the command does not return a line, or the line is commented out, this is a finding.
```


V-72199:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "rename" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw rename /etc/audit/audit.rules

-a always,exit -F arch=b32 -S rename -F auid>=1000 -F auid!=4294967295 -k delete

-a always,exit -F arch=b64 -S rename -F auid>=1000 -F auid!=4294967295 -k delete

If both the "b32" and "b64" audit rules are not defined for the "rename" syscall, this is a finding.
```


V-72201:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "renameat" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw renameat /etc/audit/audit.rules

-a always,exit -F arch=b32 -S renameat -F auid>=1000 -F auid!=4294967295 -k delete

-a always,exit -F arch=b64 -S renameat -F auid>=1000 -F auid!=4294967295 -k delete

If both the "b32" and "b64" audit rules are not defined for the "renameat" syscall, this is a finding.
```


V-72203:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "rmdir" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw rmdir /etc/audit/audit.rules

-a always,exit -F arch=b32 -S rmdir -F auid>=1000 -F auid!=4294967295 -k delete

-a always,exit -F arch=b64 -S rmdir -F auid>=1000 -F auid!=4294967295 -k delete

If both the "b32" and "b64" audit rules are not defined for the "rmdir" syscall, this is a finding.
```


V-72205:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "unlink" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw unlink /etc/audit/audit.rules

-a always,exit -F arch=b32 -S unlink -F auid>=1000 -F auid!=4294967295 -k delete

-a always,exit -F arch=b64 -S unlink -F auid>=1000 -F auid!=4294967295 -k delete

If both the "b32" and "b64" audit rules are not defined for the "unlink" syscall, this is a finding.
```


V-72207:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "unlinkat" syscall occur.

Check the file system rules in "/etc/audit/audit.rules" with the following commands:

# grep -iw unlinkat /etc/audit/audit.rules

-a always,exit -F arch=b32 -S unlinkat -F auid>=1000 -F auid!=4294967295 -k delete

-a always,exit -F arch=b64 -S unlinkat -F auid>=1000 -F auid!=4294967295 -k delete

If both the "b32" and "b64" audit rules are not defined for the "unlinkat" syscall, this is a finding.
```


V-72209:
```
Verify "rsyslog" is configured to send all messages to a log aggregation server.

Check the configuration of "rsyslog" with the following command:

Note: If another logging package is used, substitute the utility configuration file for "/etc/rsyslog.conf".

# grep @ /etc/rsyslog.conf /etc/rsyslog.d/*.conf
*.* @@logagg.site.mil

If there are no lines in the "/etc/rsyslog.conf" or "/etc/rsyslog.d/*.conf" files that contain the "@" or "@@" symbol(s), and the lines with the correct symbol(s) to send output to another system do not cover all "rsyslog" output, ask the System Administrator to indicate how the audit logs are off-loaded to a different system or media. 

If the lines are commented out or there is no evidence that the audit logs are being sent to another system, this is a finding.
```


V-72211:
```
Verify that the system is not accepting "rsyslog" messages from other systems unless it is documented as a log aggregation server.

Check the configuration of "rsyslog" with the following command:

# grep imtcp /etc/rsyslog.conf
$ModLoad imtcp
# grep imudp /etc/rsyslog.conf
$ModLoad imudp
# grep imrelp /etc/rsyslog.conf
$ModLoad imrelp

If any of the above modules are being loaded in the "/etc/rsyslog.conf" file, ask to see the documentation for the system being used for log aggregation.

If the documentation does not exist, or does not specify the server as a log aggregation system, this is a finding.
```


V-72213:
```
Verify an anti-virus solution is installed on the system. The anti-virus solution may be bundled with an approved host-based security solution.

If there is no anti-virus solution installed on the system, this is a finding.
```


V-72217:
```
Verify the operating system limits the number of concurrent sessions to "10" for all accounts and/or account types by issuing the following command:

# grep "maxlogins" /etc/security/limits.conf /etc/security/limits.d/*.conf

* hard maxlogins 10

This can be set as a global domain (with the * wildcard) but may be set differently for multiple domains.

If the "maxlogins" item is missing, commented out, or the value is not set to "10" or less for all domains that have the "maxlogins" item assigned, this is a finding.
```


V-72219:
```
Inspect the firewall configuration and running services to verify that it is configured to prohibit or restrict the use of functions, ports, protocols, and/or services that are unnecessary or prohibited.

Check which services are currently active with the following command:

# firewall-cmd --list-all
public (default, active)
  interfaces: enp0s3
  sources: 
  services: dhcpv6-client dns http https ldaps rpc-bind ssh
  ports: 
  masquerade: no
  forward-ports: 
  icmp-blocks: 
  rich rules: 

Ask the System Administrator for the site or program PPSM CLSA. Verify the services allowed by the firewall match the PPSM CLSA. 

If there are additional ports, protocols, or services that are not in the PPSM CLSA, or there are ports, protocols, or services that are prohibited by the PPSM Category Assurance List (CAL), this is a finding.
```


V-72221:
```
Verify the operating system uses mechanisms meeting the requirements of applicable federal laws, Executive orders, directives, policies, regulations, standards, and guidance for authentication to a cryptographic module.

Note: If RHEL-07-021350 is a finding, this is automatically a finding as the system cannot implement FIPS 140-2-approved cryptographic algorithms and hashes.

The location of the "sshd_config" file may vary if a different daemon is in use.

Inspect the "Ciphers" configuration with the following command:

# grep -i ciphers /etc/ssh/sshd_config
Ciphers aes128-ctr,aes192-ctr,aes256-ctr

If any ciphers other than "aes128-ctr", "aes192-ctr", or "aes256-ctr" are listed, the "Ciphers" keyword is missing, or the returned line is commented out, this is a finding.
```


V-72223:
```
Verify the operating system terminates all network connections associated with a communications session at the end of the session or based on inactivity.

Check the value of the system inactivity timeout with the following command:

# grep -i tmout /etc/profile.d/*

etc/profile.d/tmout.sh:TMOUT=600

/etc/profile.d/tmout.sh:readonly TMOUT

/etc/profile.d/tmout.sh:export TMOUT

If "TMOUT" is not set to "600" or less in a script located in the /etc/profile.d/ directory to enforce session termination after inactivity, this is a finding.
```


V-72225:
```
Verify any publicly accessible connection to the operating system displays the Standard Mandatory DoD Notice and Consent Banner before granting access to the system.

Check for the location of the banner file being used with the following command:

# grep -i banner /etc/ssh/sshd_config

banner /etc/issue

This command will return the banner keyword and the name of the file that contains the ssh banner (in this case "/etc/issue").

If the line is commented out, this is a finding.

View the file specified by the banner keyword to check that it matches the text of the Standard Mandatory DoD Notice and Consent Banner:

"You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.

By using this IS (which includes any device attached to this IS), you consent to the following conditions:

-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.

-At any time, the USG may inspect and seize data stored on this IS.

-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.

-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.

-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details."

If the system does not display a graphical logon banner or the banner does not match the Standard Mandatory DoD Notice and Consent Banner, this is a finding.

If the text in the file does not match the Standard Mandatory DoD Notice and Consent Banner, this is a finding.
```


V-72227:
```
If LDAP is not being utilized, this requirement is Not Applicable.

Verify the operating system implements cryptography to protect the integrity of remote LDAP authentication sessions.

To determine if LDAP is being used for authentication, use the following command:

# systemctl status sssd.service
sssd.service - System Security Services Daemon
Loaded: loaded (/usr/lib/systemd/system/sssd.service; enabled; vendor preset: disabled)
Active: active (running) since Wed 2018-06-27 10:58:11 EST; 1h 50min ago

If the "sssd.service" is "active", then LDAP is being used. 

Determine the "id_provider" the LDAP is currently using:

# grep -i "id_provider" /etc/sssd/sssd.conf

id_provider = ad

If "id_provider" is set to "ad", this is Not Applicable.

Ensure that LDAP is configured to use TLS by using the following command:

# grep -i "start_tls" /etc/sssd/sssd.conf
ldap_id_use_start_tls = true

If the "ldap_id_use_start_tls" option is not "true", this is a finding.
```


V-72229:
```
If LDAP is not being utilized, this requirement is Not Applicable.

Verify the operating system implements cryptography to protect the integrity of remote LDAP access sessions.

To determine if LDAP is being used for authentication, use the following command:

# systemctl status sssd.service
sssd.service - System Security Services Daemon
Loaded: loaded (/usr/lib/systemd/system/sssd.service; enabled; vendor preset: disabled)
Active: active (running) since Wed 2018-06-27 10:58:11 EST; 1h 50min ago

If the "sssd.service" is "active", then LDAP is being used. 

Determine the "id_provider" the LDAP is currently using:

# grep -i "id_provider" /etc/sssd/sssd.conf

id_provider = ad

If "id_provider" is set to "ad", this is Not Applicable.

Verify the sssd service is configured to require the use of certificates:

# grep -i tls_reqcert /etc/sssd/sssd.conf
ldap_tls_reqcert = demand

If the "ldap_tls_reqcert" setting is missing, commented out, or does not exist, this is a finding.

If the "ldap_tls_reqcert" setting is not set to "demand" or "hard", this is a finding.
```


V-72231:
```
If LDAP is not being utilized, this requirement is Not Applicable.

Verify the operating system implements cryptography to protect the integrity of remote LDAP access sessions.

To determine if LDAP is being used for authentication, use the following command:

# systemctl status sssd.service
sssd.service - System Security Services Daemon
Loaded: loaded (/usr/lib/systemd/system/sssd.service; enabled; vendor preset: disabled)
Active: active (running) since Wed 2018-06-27 10:58:11 EST; 1h 50min ago

If the "sssd.service" is "active", then LDAP is being used.

Determine the "id_provider" that the LDAP is currently using:

# grep -i "id_provider" /etc/sssd/sssd.conf

id_provider = ad

If "id_provider" is set to "ad", this is Not Applicable.

Check the path to the X.509 certificate for peer authentication with the following command:

# grep -i tls_cacert /etc/sssd/sssd.conf

ldap_tls_cacert = /etc/pki/tls/certs/ca-bundle.crt

Verify the "ldap_tls_cacert" option points to a file that contains the trusted CA certificate.

If this file does not exist, or the option is commented out or missing, this is a finding.
```


V-72235:
```
Verify SSH is loaded and active with the following command:

# systemctl status sshd
sshd.service - OpenSSH server daemon
Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled)
Active: active (running) since Tue 2015-11-17 15:17:22 EST; 4 weeks 0 days ago
Main PID: 1348 (sshd)
CGroup: /system.slice/sshd.service
1053 /usr/sbin/sshd -D

If "sshd" does not show a status of "active" and "running", this is a finding.
```


V-72237:
```
Verify the operating system automatically terminates a user session after inactivity time-outs have expired.

Check for the value of the "ClientAliveInterval" keyword with the following command:

# grep -iw clientaliveinterval /etc/ssh/sshd_config

ClientAliveInterval 600

If "ClientAliveInterval" is not configured, commented out, or has a value of "0", this is a finding.

If "ClientAliveInterval" has a value that is greater than "600" and is not documented with the Information System Security Officer (ISSO) as an operational requirement, this is a finding.
```


V-72239:
```
Check the version of the operating system with the following command:

# cat /etc/redhat-release

If the release is 7.4 or newer this requirement is Not Applicable.

Verify the SSH daemon does not allow authentication using RSA rhosts authentication.

To determine how the SSH daemon's "RhostsRSAAuthentication" option is set, run the following command:

# grep RhostsRSAAuthentication /etc/ssh/sshd_config
RhostsRSAAuthentication no

If the value is returned as "yes", the returned line is commented out, or no output is returned, this is a finding.
```


V-72241:
```
Verify the operating system automatically terminates a user session after inactivity time-outs have expired.

Check for the value of the "ClientAliveCountMax" keyword with the following command:

# grep -i clientalivecount /etc/ssh/sshd_config
ClientAliveCountMax 0

If "ClientAliveCountMax" is not set to "0", this is a finding.
```


V-72243:
```
Verify the SSH daemon does not allow authentication using known hosts authentication.

To determine how the SSH daemon's "IgnoreRhosts" option is set, run the following command:

# grep -i IgnoreRhosts /etc/ssh/sshd_config

IgnoreRhosts yes

If the value is returned as "no", the returned line is commented out, or no output is returned, this is a finding.
```


V-72245:
```
Verify SSH provides users with feedback on when account accesses last occurred.

Check that "PrintLastLog" keyword in the sshd daemon configuration file is used and set to "yes" with the following command:

# grep -i printlastlog /etc/ssh/sshd_config
PrintLastLog yes

If the "PrintLastLog" keyword is set to "no", is missing, or is commented out, this is a finding.
```


V-72247:
```
Verify remote access using SSH prevents users from logging on directly as root.

Check that SSH prevents users from logging on directly as root with the following command:

# grep -i permitrootlogin /etc/ssh/sshd_config
PermitRootLogin no

If the "PermitRootLogin" keyword is set to "yes", is missing, or is commented out, this is a finding.
```


V-72249:
```
Verify the SSH daemon does not allow authentication using known hosts authentication.

To determine how the SSH daemon's "IgnoreUserKnownHosts" option is set, run the following command:

# grep -i IgnoreUserKnownHosts /etc/ssh/sshd_config

IgnoreUserKnownHosts yes

If the value is returned as "no", the returned line is commented out, or no output is returned, this is a finding.
```


V-72251:
```
Check the version of the operating system with the following command:

# cat /etc/redhat-release

If the release is 7.4 or newer this requirement is Not Applicable.

Verify the SSH daemon is configured to only use the SSHv2 protocol.

Check that the SSH daemon is configured to only use the SSHv2 protocol with the following command:

# grep -i protocol /etc/ssh/sshd_config
Protocol 2
#Protocol 1,2

If any protocol line other than "Protocol 2" is uncommented, this is a finding.
```


V-72253:
```
Verify the SSH daemon is configured to only use MACs employing FIPS 140-2-approved ciphers.

Note: If RHEL-07-021350 is a finding, this is automatically a finding as the system cannot implement FIPS 140-2-approved cryptographic algorithms and hashes.

Check that the SSH daemon is configured to only use MACs employing FIPS 140-2-approved ciphers with the following command:

# grep -i macs /etc/ssh/sshd_config
MACs hmac-sha2-256,hmac-sha2-512

If any ciphers other than "hmac-sha2-256" or "hmac-sha2-512" are listed or the returned line is commented out, this is a finding.
```


V-72255:
```
Verify the SSH public host key files have mode "0644" or less permissive.

Note: SSH public key files may be found in other directories on the system depending on the installation.

The following command will find all SSH public key files on the system:

# find /etc/ssh -name '*.pub' -exec ls -lL {} \;

-rw-r--r-- 1 root root 618 Nov 28 06:43 ssh_host_dsa_key.pub
-rw-r--r-- 1 root root 347 Nov 28 06:43 ssh_host_key.pub
-rw-r--r-- 1 root root 238 Nov 28 06:43 ssh_host_rsa_key.pub

If any file has a mode more permissive than "0644", this is a finding.
```


V-72257:
```
Verify the SSH private host key files have mode "0640" or less permissive.

The following command will find all SSH private key files on the system and list their modes:

# find / -name '*ssh_host*key' | xargs ls -lL

-rw-r----- 1 root ssh_keys 668 Nov 28 06:43 ssh_host_dsa_key
-rw-r----- 1 root ssh_keys 582 Nov 28 06:43 ssh_host_key
-rw-r----- 1 root ssh_keys 887 Nov 28 06:43 ssh_host_rsa_key

If any file has a mode more permissive than "0640", this is a finding.
```


V-72259:
```
Verify the SSH daemon does not permit GSSAPI authentication unless approved.

Check that the SSH daemon does not permit GSSAPI authentication with the following command:

# grep -i gssapiauth /etc/ssh/sshd_config
GSSAPIAuthentication no

If the "GSSAPIAuthentication" keyword is missing, is set to "yes" and is not documented with the Information System Security Officer (ISSO), or the returned line is commented out, this is a finding.
```


V-72261:
```
Verify the SSH daemon does not permit Kerberos to authenticate passwords unless approved.

Check that the SSH daemon does not permit Kerberos to authenticate passwords with the following command:

# grep -i kerberosauth /etc/ssh/sshd_config
KerberosAuthentication no

If the "KerberosAuthentication" keyword is missing, or is set to "yes" and is not documented with the Information System Security Officer (ISSO), or the returned line is commented out, this is a finding.
```


V-72263:
```
Verify the SSH daemon performs strict mode checking of home directory configuration files.

The location of the "sshd_config" file may vary if a different daemon is in use.

Inspect the "sshd_config" file with the following command:

# grep -i strictmodes /etc/ssh/sshd_config

StrictModes yes

If "StrictModes" is set to "no", is missing, or the returned line is commented out, this is a finding.
```


V-72265:
```
Verify the SSH daemon performs privilege separation.

Check that the SSH daemon performs privilege separation with the following command:

# grep -i usepriv /etc/ssh/sshd_config

UsePrivilegeSeparation sandbox

If the "UsePrivilegeSeparation" keyword is set to "no", is missing, or the returned line is commented out, this is a finding.
```


V-72267:
```
Verify the SSH daemon performs compression after a user successfully authenticates.

Check that the SSH daemon performs compression after a user successfully authenticates with the following command:

# grep -i compression /etc/ssh/sshd_config
Compression delayed

If the "Compression" keyword is set to "yes", is missing, or the returned line is commented out, this is a finding.
```


V-72269:
```
Check to see if NTP is running in continuous mode:

# ps -ef | grep ntp

If NTP is not running, check to see if "chronyd" is running in continuous mode:

# ps -ef | grep chronyd

If NTP or "chronyd" is not running, this is a finding.

If the NTP process is found, then check the "ntp.conf" file for the "maxpoll" option setting:

# grep maxpoll /etc/ntp.conf

server 0.rhel.pool.ntp.org iburst maxpoll 10

If the option is set to "17" or is not set, this is a finding.

If the file does not exist, check the "/etc/cron.daily" subdirectory for a crontab file controlling the execution of the "ntpd -q" command.

# grep -i "ntpd -q" /etc/cron.daily/*
# ls -al /etc/cron.* | grep ntp

ntp

If a crontab file does not exist in the "/etc/cron.daily" that executes the "ntpd -q" command, this is a finding.

If the "chronyd" process is found, then check the "chrony.conf" file for the "maxpoll" option setting:

# grep maxpoll /etc/chrony.conf

server 0.rhel.pool.ntp.org iburst maxpoll 10

If the option is not set or the line is commented out, this is a finding.
```


V-72273:
```
Verify the operating system enabled an application firewall.

Check to see if "firewalld" is installed with the following command:

# yum list installed firewalld
firewalld-0.3.9-11.el7.noarch.rpm

If the "firewalld" package is not installed, ask the System Administrator if another firewall application (such as iptables) is installed. 

If an application firewall is not installed, this is a finding. 

Check to see if the firewall is loaded and active with the following command:

# systemctl status firewalld
firewalld.service - firewalld - dynamic firewall daemon

   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled)
   Active: active (running) since Tue 2014-06-17 11:14:49 CEST; 5 days ago

If "firewalld" does not show a status of "loaded" and "active", this is a finding. 

Check the state of the firewall:

# firewall-cmd --state 
running

If "firewalld" does not show a state of "running", this is a finding.
```


V-72275:
```
Verify users are provided with feedback on when account accesses last occurred.

Check that "pam_lastlog" is used and not silent with the following command:

# grep pam_lastlog /etc/pam.d/postlogin
session required pam_lastlog.so showfailed

If "pam_lastlog" is missing from "/etc/pam.d/postlogin" file, or the silent option is present, this is a finding.
```


V-72277:
```
Verify there are no ".shosts" files on the system.

Check the system for the existence of these files with the following command:

# find / -name '*.shosts'

If any ".shosts" files are found on the system, this is a finding.
```


V-72279:
```
Verify there are no "shosts.equiv" files on the system.

Check the system for the existence of these files with the following command:

# find / -name shosts.equiv

If any "shosts.equiv" files are found on the system, this is a finding.
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


V-72283:
```
Verify the system does not accept IPv4 source-routed packets.

# grep net.ipv4.conf.all.accept_source_route /etc/sysctl.conf /etc/sysctl.d/*

net.ipv4.conf.all.accept_source_route = 0

If " net.ipv4.conf.all.accept_source_route " is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out, or does not have a value of "0", this is a finding.

Check that the operating system implements the accept source route variable with the following command:

# /sbin/sysctl -a | grep net.ipv4.conf.all.accept_source_route
net.ipv4.conf.all.accept_source_route = 0

If the returned line does not have a value of "0", this is a finding.
```


V-72285:
```
Verify the system does not accept IPv4 source-routed packets by default.

# grep net.ipv4.conf.default.accept_source_route /etc/sysctl.conf /etc/sysctl.d/*
net.ipv4.conf.default.accept_source_route = 0

If " net.ipv4.conf.default.accept_source_route " is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out, or does not have a value of "0", this is a finding.

Check that the operating system implements the accept source route variable with the following command:

# /sbin/sysctl -a | grep net.ipv4.conf.default.accept_source_route
net.ipv4.conf.default.accept_source_route = 0

If the returned line does not have a value of "0", this is a finding.
```


V-72287:
```
Verify the system does not respond to IPv4 ICMP echoes sent to a broadcast address.

# grep net.ipv4.icmp_echo_ignore_broadcasts /etc/sysctl.conf /etc/sysctl.d/*

If " net.ipv4.icmp_echo_ignore_broadcasts" is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out, or does not have a value of "1", this is a finding.

Check that the operating system implements the "icmp_echo_ignore_broadcasts" variable with the following command:

# /sbin/sysctl -a | grep net.ipv4.icmp_echo_ignore_broadcasts
net.ipv4.icmp_echo_ignore_broadcasts = 1

If the returned line does not have a value of "1", this is a finding.
```


V-72289:
```
Verify the system will not accept IPv4 ICMP redirect messages.

# grep 'net.ipv4.conf.default.accept_redirects' /etc/sysctl.conf /etc/sysctl.d/*

If " net.ipv4.conf.default.accept_redirects " is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out, or does not have a value of "0", this is a finding.

Check that the operating system implements the value of the "accept_redirects" variables with the following command:

# /sbin/sysctl -a | grep 'net.ipv4.conf.default.accept_redirects'
net.ipv4.conf.default.accept_redirects = 0

If the returned line does not have a value of "0", this is a finding.
```


V-72291:
```
Verify the system does not allow interfaces to perform IPv4 ICMP redirects by default.

# grep 'net.ipv4.conf.default.send_redirects' /etc/sysctl.conf /etc/sysctl.d/*

If "net.ipv4.conf.default.send_redirects" is not configured in the "/etc/sysctl.conf" file or in the /etc/sysctl.d/ directory, is commented out or does not have a value of "0", this is a finding.

Check that the operating system implements the "default send_redirects" variables with the following command:

# /sbin/sysctl -a | grep 'net.ipv4.conf.default.send_redirects'

net.ipv4.conf.default.send_redirects = 0 

If the returned line does not have a value of "0", this is a finding.
```


V-72293:
```
Verify the system does not send IPv4 ICMP redirect messages.

# grep 'net.ipv4.conf.all.send_redirects' /etc/sysctl.conf /etc/sysctl.d/*

If "net.ipv4.conf.all.send_redirects" is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out or does not have a value of "0", this is a finding.

Check that the operating system implements the "all send_redirects" variables with the following command:

# /sbin/sysctl -a | grep 'net.ipv4.conf.all.send_redirects'

net.ipv4.conf.all.send_redirects = 0

If the returned line does not have a value of "0", this is a finding.
```


V-72295:
```
Verify network interfaces are not in promiscuous mode unless approved by the ISSO and documented.

Check for the status with the following command:

# ip link | grep -i promisc

If network interfaces are found on the system in promiscuous mode and their use has not been approved by the ISSO and documented, this is a finding.
```


V-72297:
```
Verify the system is configured to prevent unrestricted mail relaying.

Determine if "postfix" is installed with the following commands:

# yum list installed postfix
postfix-2.6.6-6.el7.x86_64.rpm 

If postfix is not installed, this is Not Applicable.

If postfix is installed, determine if it is configured to reject connections from unknown or untrusted networks with the following command:

# postconf -n smtpd_client_restrictions
smtpd_client_restrictions = permit_mynetworks, reject

If the "smtpd_client_restrictions" parameter contains any entries other than "permit_mynetworks" and "reject", this is a finding.
```


V-72299:
```
Verify an FTP server has not been installed on the system.

Check to see if an FTP server has been installed with the following commands:

# yum list installed vsftpd

 vsftpd-3.0.2.el7.x86_64.rpm

If "vsftpd" is installed and is not documented with the Information System Security Officer (ISSO) as an operational requirement, this is a finding.
```


V-72301:
```
Verify a TFTP server has not been installed on the system.

Check to see if a TFTP server has been installed with the following command:

# yum list installed tftp-server
tftp-server-0.49-9.el7.x86_64.rpm

If TFTP is installed and the requirement for TFTP is not documented with the ISSO, this is a finding.
```


V-72303:
```
Verify remote X connections for interactive users are encrypted.

Check that remote X connections are encrypted with the following command:

# grep -i x11forwarding /etc/ssh/sshd_config | grep -v "^#"

X11Forwarding yes

If the "X11Forwarding" keyword is set to "no" or is missing, this is a finding.
```


V-72305:
```
Verify the TFTP daemon is configured to operate in secure mode.

Check to see if a TFTP server has been installed with the following commands:

# yum list installed tftp-server
tftp-server.x86_64 x.x-x.el7 rhel-7-server-rpms

If a TFTP server is not installed, this is Not Applicable.

If a TFTP server is installed, check for the server arguments with the following command: 

# grep server_args /etc/xinetd.d/tftp
server_args = -s /var/lib/tftpboot

If the "server_args" line does not have a "-s" option and a subdirectory is not assigned, this is a finding.
```


V-72307:
```
Verify that if the system has X Windows System installed, it is authorized.

Check for the X11 package with the following command:

# rpm -qa | grep xorg | grep server

Ask the System Administrator if use of the X Windows System is an operational requirement.

If the use of X Windows on the system is not documented with the Information System Security Officer (ISSO), this is a finding.
```


V-72309:
```
Verify the system is not performing packet forwarding, unless the system is a router.

# grep net.ipv4.ip_forward /etc/sysctl.conf /etc/sysctl.d/*

net.ipv4.ip_forward = 0

If "net.ipv4.ip_forward" is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out, or does not have a value of "0", this is a finding.

Check that the operating system does not implement IP forwarding using the following command:

# /sbin/sysctl -a | grep net.ipv4.ip_forward
net.ipv4.ip_forward = 0

If IP forwarding value is "1" and the system is hosting any application, database, or web servers, this is a finding.
```


V-72311:
```
Verify "AUTH_GSS" is being used to authenticate NFS mounts.

To check if the system is importing an NFS file system, look for any entries in the "/etc/fstab" file that have a file system type of "nfs" with the following command:

# cat /etc/fstab | grep nfs
192.168.21.5:/mnt/export /data1 nfs4 rw,sync ,soft,sec=krb5:krb5i:krb5p

If the system is mounting file systems via NFS and has the sec option without the "krb5:krb5i:krb5p" settings, the "sec" option has the "sys" setting, or the "sec" option is missing, this is a finding.
```


V-72313:
```
Verify that a system using SNMP is not using default community strings.

Check to see if the "/etc/snmp/snmpd.conf" file exists with the following command:

# ls -al /etc/snmp/snmpd.conf
 -rw-------   1 root root      52640 Mar 12 11:08 snmpd.conf

If the file does not exist, this is Not Applicable.

If the file does exist, check for the default community strings with the following commands:

# grep public /etc/snmp/snmpd.conf
# grep private /etc/snmp/snmpd.conf

If either of these commands returns any output, this is a finding.
```


V-72315:
```
If the "firewalld" package is not installed, ask the System Administrator (SA) if another firewall application (such as iptables) is installed. If an application firewall is not installed, this is a finding. 

Verify the system's access control program is configured to grant or deny system access to specific hosts.

Check to see if "firewalld" is active with the following command:

# systemctl status firewalld
firewalld.service - firewalld - dynamic firewall daemon
Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled)
Active: active (running) since Sun 2014-04-20 14:06:46 BST; 30s ago

If "firewalld" is active, check to see if it is configured to grant or deny access to specific hosts or services with the following commands:

# firewall-cmd --get-default-zone
public

# firewall-cmd --list-all --zone=public
public (active)
target: default
icmp-block-inversion: no
interfaces: eth0
sources:
services: mdns ssh
ports:
protocols:
masquerade: no
forward-ports:
icmp-blocks:

If "firewalld" is not active, determine whether "tcpwrappers" is being used by checking whether the "hosts.allow" and "hosts.deny" files are empty with the following commands:

# ls -al /etc/hosts.allow
rw-r----- 1 root root 9 Aug 2 23:13 /etc/hosts.allow

# ls -al /etc/hosts.deny
-rw-r----- 1 root root 9 Apr 9 2007 /etc/hosts.deny

If "firewalld" and "tcpwrappers" are not installed, configured, and active, ask the SA if another access control program (such as iptables) is installed and active. Ask the SA to show that the running configuration grants or denies access to specific hosts or services.

If "firewalld" is active and is not configured to grant access to specific hosts or "tcpwrappers" is not configured to grant or deny access to specific hosts, this is a finding.
```


V-72317:
```
Verify the system does not have unauthorized IP tunnels configured.

Check to see if "libreswan" is installed with the following command:

# yum list installed libreswan
libreswan.x86-64 3.20-5.el7_4

If "libreswan" is installed, check to see if the "IPsec" service is active with the following command:

# systemctl status ipsec
ipsec.service - Internet Key Exchange (IKE) Protocol Daemon for IPsec
Loaded: loaded (/usr/lib/systemd/system/ipsec.service; disabled)
Active: inactive (dead)

If the "IPsec" service is active, check to see if any tunnels are configured in "/etc/ipsec.conf" and "/etc/ipsec.d/" with the following commands:

# grep -iw conn /etc/ipsec.conf /etc/ipsec.d/*.conf

If there are indications that a "conn" parameter is configured for a tunnel, ask the System Administrator if the tunnel is documented with the ISSO. 

If "libreswan" is installed, "IPsec" is active, and an undocumented tunnel is active, this is a finding.
```


V-72319:
```
If IPv6 is not enabled, the key will not exist, and this is Not Applicable.

Verify the system does not accept IPv6 source-routed packets.

# grep net.ipv6.conf.all.accept_source_route /etc/sysctl.conf /etc/sysctl.d/*

net.ipv6.conf.all.accept_source_route = 0

If "net.ipv6.conf.all.accept_source_route" is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out or does not have a value of "0", this is a finding.

Check that the operating system implements the accept source route variable with the following command:

# /sbin/sysctl -a | grep net.ipv6.conf.all.accept_source_route
net.ipv6.conf.all.accept_source_route = 0

If the returned lines do not have a value of "0", this is a finding.
```


V-72417:
```
Verify the operating system has the packages required for multifactor authentication installed.

Check for the presence of the packages required to support multifactor authentication with the following commands:

# yum list installed pam_pkcs11
pam_pkcs11-0.6.2-14.el7.noarch.rpm


If the "pam_pkcs11" package is not installed, this is a finding.
```


V-72427:
```
Verify the operating system implements multifactor authentication for remote access to privileged accounts via pluggable authentication modules (PAM).

Check the "/etc/sssd/sssd.conf" file for the authentication services that are being used with the following command:

# grep services /etc/sssd/sssd.conf /etc/sssd/conf.d/*.conf

services = nss, pam

If the "pam" service is not present on all "services" lines, this is a finding.
```


V-72433:
```
Verify the operating system implements certificate status checking for PKI authentication.

Check to see if Online Certificate Status Protocol (OCSP) is enabled on the system with the following command:

# grep cert_policy /etc/pam_pkcs11/pam_pkcs11.conf | grep -v "^#"

cert_policy = ca, ocsp_on, signature;
cert_policy = ca, ocsp_on, signature;
cert_policy = ca, ocsp_on, signature;

There should be at least three lines returned. 

If "ocsp_on" is not present in all uncommented "cert_policy" lines in "/etc/pam_pkcs11/pam_pkcs11.conf", this is a finding.
```


V-73155:
```
Verify the operating system prevents a user from overriding a screensaver lock after a 15-minute period of inactivity for graphical user interfaces. 

Note: If the system does not have GNOME installed, this requirement is Not Applicable. The screen program must be installed to lock sessions on the console.

Determine which profile the system database is using with the following command:
# grep system-db /etc/dconf/profile/user

system-db:local

Check for the lock delay setting with the following command:

Note: The example below is using the database "local" for the system, so the path is "/etc/dconf/db/local.d". This path must be modified if a database other than "local" is being used.

# grep -i lock-delay /etc/dconf/db/local.d/locks/*

/org/gnome/desktop/screensaver/lock-delay

If the command does not return a result, this is a finding.
```


V-73157:
```
Verify the operating system prevents a user from overriding session idle delay after a 15-minute period of inactivity for graphical user interfaces. 

Note: If the system does not have GNOME installed, this requirement is Not Applicable. The screen program must be installed to lock sessions on the console. 

Determine which profile the system database is using with the following command:
# grep system-db /etc/dconf/profile/user

system-db:local

Check for the session idle delay setting with the following command:

Note: The example below is using the database "local" for the system, so the path is "/etc/dconf/db/local.d". This path must be modified if a database other than "local" is being used.

# grep -i idle-delay /etc/dconf/db/local.d/locks/*

/org/gnome/desktop/session/idle-delay

If the command does not return a result, this is a finding.
```


V-73159:
```
Verify the operating system uses "pwquality" to enforce the password complexity rules. 

Check for the use of "pwquality" with the following command:

# cat /etc/pam.d/system-auth | grep pam_pwquality

password required pam_pwquality.so retry=3

If the command does not return an uncommented line containing the value "pam_pwquality.so", this is a finding.

If the value of "retry" is set to "0" or greater than "3", this is a finding.
```


V-73161:
```
Verify file systems that are being NFS imported are configured with the "noexec" option.

Find the file system(s) that contain the directories being imported with the following command:

# more /etc/fstab | grep nfs

UUID=e06097bb-cfcd-437b-9e4d-a691f5662a7d /store nfs rw,noexec 0 0

If a file system found in "/etc/fstab" refers to NFS and it does not have the "noexec" option set, and use of NFS imported binaries is not documented with the Information System Security Officer (ISSO) as an operational requirement, this is a finding.

Verify the NFS is mounted with the "noexec"option:

# mount | grep nfs | grep noexec
If no results are returned and use of NFS imported binaries is not documented with the Information System Security Officer (ISSO) as an operational requirement, this is a finding.
```


V-73163:
```
Verify the action the operating system takes if there is an error sending audit records to a remote system.

Check the action that takes place if there is an error sending audit records to a remote system with the following command:

# grep -i network_failure_action /etc/audisp/audisp-remote.conf
network_failure_action = syslog

If the value of the "network_failure_action" option is not "syslog", "single", or "halt", or the line is commented out, this is a finding.
```


V-73165:
```
Verify the operating system must generate audit records for all account creations, modifications, disabling, and termination events that affect "/etc/group".

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep /etc/group /etc/audit/audit.rules

-w /etc/group -p wa -k identity

If the command does not return a line, or the line is commented out, this is a finding.
```


V-73167:
```
Verify the operating system must generate audit records for all account creations, modifications, disabling, and termination events that affect "/etc/gshadow".

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep /etc/gshadow /etc/audit/audit.rules

-w /etc/gshadow -p wa -k identity

If the command does not return a line, or the line is commented out, this is a finding.
```


V-73171:
```
Verify the operating system must generate audit records for all account creations, modifications, disabling, and termination events that affect /etc/shadow.

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep /etc/shadow /etc/audit/audit.rules

-w /etc/shadow -p wa -k identity

If the command does not return a line, or the line is commented out, this is a finding.
```


V-73173:
```
Verify the operating system must generate audit records for all account creations, modifications, disabling, and termination events that affect /etc/opasswd.

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep /etc/security/opasswd /etc/audit/audit.rules

-w /etc/security/opasswd -p wa -k identity

If the command does not return a line, or the line is commented out, this is a finding.
```


V-73175:
```
Verify the system ignores IPv4 ICMP redirect messages.

# grep 'net.ipv4.conf.all.accept_redirects' /etc/sysctl.conf /etc/sysctl.d/*

If " net.ipv4.conf.all.accept_redirects " is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out, or does not have a value of "0", this is a finding.

Check that the operating system implements the "accept_redirects" variables with the following command:

# /sbin/sysctl -a | grep 'net.ipv4.conf.all.accept_redirects'

net.ipv4.conf.all.accept_redirects = 0

If the returned line does not have a value of "0", this is a finding.
```


V-73177:
```
Verify that there are no wireless interfaces configured on the system.

This is N/A for systems that do not have wireless network adapters.

Check for the presence of active wireless interfaces with the following command:

# nmcli device
DEVICE TYPE STATE
eth0 ethernet connected
wlp3s0 wifi disconnected
lo loopback unmanaged

If a wireless interface is configured and its use on the system is not documented with the Information System Security Officer (ISSO), this is a finding.
```


V-77819:
```
Verify the operating system uniquely identifies and authenticates users using multifactor authentication via a graphical user logon.

Note: If the system does not have GNOME installed, this requirement is Not Applicable. 

Determine which profile the system database is using with the following command:

# grep system-db /etc/dconf/profile/user

system-db:local

Note: The example is using the database local for the system, so the path is "/etc/dconf/db/local.d". This path must be modified if a database other than local is being used.

# grep enable-smartcard-authentication /etc/dconf/db/local.d/*

enable-smartcard-authentication=true

If "enable-smartcard-authentication" is set to "false" or the keyword is missing, this is a finding.
```


V-77821:
```
Verify the operating system disables the ability to load the DCCP kernel module.

# grep -r dccp /etc/modprobe.d/* | grep -i "/bin/true" | grep -v "^#"

install dccp /bin/true

If the command does not return any output, or the line is commented out, and use of DCCP is not documented with the Information System Security Officer (ISSO) as an operational requirement, this is a finding.

Verify the operating system disables the ability to use the DCCP kernel module.

Check to see if the DCCP kernel module is disabled with the following command:

# grep -i dccp /etc/modprobe.d/* | grep -i "blacklist" | grep -v "^#"

blacklist dccp

If the command does not return any output or the output is not "blacklist dccp", and use of the dccp kernel module is not documented with the Information System Security Officer (ISSO) as an operational requirement, this is a finding.
```


V-77823:
```
Verify the operating system must require authentication upon booting into single-user and maintenance modes.

Check that the operating system requires authentication upon booting into single-user mode with the following command:

# grep -i execstart /usr/lib/systemd/system/rescue.service | grep -i sulogin

ExecStart=-/bin/sh -c "/usr/sbin/sulogin; /usr/bin/systemctl --fail --no-block default"

If "ExecStart" does not have "/usr/sbin/sulogin" as an option, this is a finding.
```


V-77825:
```
Verify the operating system implements virtual address space randomization.

# grep kernel.randomize_va_space /etc/sysctl.conf /etc/sysctl.d/*

kernel.randomize_va_space = 2

If "kernel.randomize_va_space" is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out or does not have a value of "2", this is a finding.

Check that the operating system implements virtual address space randomization with the following command:

# /sbin/sysctl -a | grep kernel.randomize_va_space 

kernel.randomize_va_space = 2

If "kernel.randomize_va_space" does not have a value of "2", this is a finding.
```


V-78995:
```
Verify the operating system prevents a user from overriding the screensaver lock-enabled setting for the graphical user interface. 

Note: If the system does not have GNOME installed, this requirement is Not Applicable. The screen program must be installed to lock sessions on the console.

Determine which profile the system database is using with the following command:
# grep system-db /etc/dconf/profile/user

system-db:local

Check for the lock-enabled setting with the following command:

Note: The example below is using the database "local" for the system, so the path is "/etc/dconf/db/local.d". This path must be modified if a database other than "local" is being used.

# grep -i lock-enabled /etc/dconf/db/local.d/locks/*

/org/gnome/desktop/screensaver/lock-enabled

If the command does not return a result, this is a finding.
```


V-78997:
```
Verify the operating system prevents a user from overriding the screensaver idle-activation-enabled setting for the graphical user interface. 

Note: If the system does not have GNOME installed, this requirement is Not Applicable. The screen program must be installed to lock sessions on the console.

Determine which profile the system database is using with the following command:
# grep system-db /etc/dconf/profile/user

system-db:local

Check for the idle-activation-enabled setting with the following command:

Note: The example below is using the database "local" for the system, so the path is "/etc/dconf/db/local.d". This path must be modified if a database other than "local" is being used.

# grep -i idle-activation-enabled /etc/dconf/db/local.d/locks/*

/org/gnome/desktop/screensaver/idle-activation-enabled

If the command does not return a result, this is a finding.
```


V-78999:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "create_module" syscall occur. 

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep -iw create_module /etc/audit/audit.rules

-a always,exit -F arch=b32 -S create_module -k module-change

-a always,exit -F arch=b64 -S create_module -k module-change

If both the "b32" and "b64" audit rules are not defined for the "create_module" syscall, this is a finding.
```


V-79001:
```
Verify the operating system generates audit records when successful/unsuccessful attempts to use the "finit_module" syscall occur. 

Check the auditing rules in "/etc/audit/audit.rules" with the following command:

# grep -iw finit_module /etc/audit/audit.rules

-a always,exit -F arch=b32 -S finit_module -k module-change

-a always,exit -F arch=b64 -S finit_module -k module-change

If both the "b32" and "b64" audit rules are not defined for the "finit_module" syscall, this is a finding.
```


V-81003:
```
Verify that /etc/pam.d/passwd is configured to use /etc/pam.d/system-auth when changing passwords:

# cat /etc/pam.d/passwd | grep -i substack | grep -i system-auth
password     substack     system-auth

If no results are returned, the line is commented out, this is a finding.
```


V-81005:
```
For systems that use UEFI, this is Not Applicable.

For systems that are running a version of RHEL prior to 7.2, this is Not Applicable.

Check to see if an encrypted root password is set. On systems that use a BIOS, use the following command:

# grep -iw grub2_password /boot/grub2/user.cfg
GRUB2_PASSWORD=grub.pbkdf2.sha512.[password_hash]

If the root password does not begin with "grub.pbkdf2.sha512", this is a finding.

Verify that the "root" account is set as the "superusers":

# grep -iw "superusers" /boot/grub2/grub.cfg
    set superusers="root"
    export superusers

If "superusers" is not set to "root", this is a finding.
```


V-81007:
```
For systems that use BIOS, this is Not Applicable.

For systems that are running a version of RHEL prior to 7.2, this is Not Applicable.

Check to see if an encrypted root password is set. On systems that use UEFI, use the following command:

# grep -iw grub2_password /boot/efi/EFI/redhat/user.cfg
GRUB2_PASSWORD=grub.pbkdf2.sha512.[password_hash]

If the root password does not begin with "grub.pbkdf2.sha512", this is a finding.

Verify that the "root" account is set as the "superusers":

# grep -iw "superusers" /boot/efi/EFI/redhat/grub.cfg
    set superusers="root"
    export superusers

If "superusers" is not set to "root", this is a finding.
```


V-81009:
```
Verify that the "nodev" option is configured for /dev/shm:


# cat /etc/fstab | grep /dev/shm
tmpfs /dev/shm tmpfs defaults,nodev,nosuid,noexec 0 0

If any results are returned and the "nodev" option is not listed, this is a finding.

Verify "/dev/shm" is mounted with the "nodev" option:

# mount | grep "/dev/shm" | grep nodev

If no results are returned, this is a finding.
```


V-81011:
```
Verify that the "nosuid" option is configured for /dev/shm:

# cat /etc/fstab | grep /dev/shm

tmpfs /dev/shm tmpfs defaults,nodev,nosuid,noexec 0 0

If any results are returned and the "nosuid" option is not listed, this is a finding.

Verify "/dev/shm" is mounted with the "nosuid" option:

# mount | grep "/dev/shm" | grep nosuid

If no results are returned, this is a finding.
```


V-81013:
```
Verify that the "noexec" option is configured for /dev/shm:

# cat /etc/fstab | grep /dev/shm

tmpfs /dev/shm tmpfs defaults,nodev,nosuid,noexec 0 0

If any results are returned and the "noexec" option is not listed, this is a finding.

Verify "/dev/shm" is mounted with the "noexec" option:

# mount | grep "/dev/shm" | grep noexec

If no results are returned, this is a finding.
```


V-81015:
```
Verify the "au-remote" plugin is active on the system:

# grep "active" /etc/audisp/plugins.d/au-remote.conf

active = yes

If the "active" setting is not set to "yes", or the line is commented out, this is a finding.
```


V-81017:
```
Verify the "au-remote" plugin is configured to always off-load audit logs using the audisp-remote daemon:

# cat /etc/audisp/plugins.d/au-remote.conf | grep -v "^#"

active = yes
direction = out
path = /sbin/audisp-remote
type = always
format = string

If the "direction" setting is not set to "out", or the line is commented out, this is a finding.

If the "path" setting is not set to "/sbin/audisp-remote", or the line is commented out, this is a finding.

If the "type" setting is not set to "always", or the line is commented out, this is a finding.
```


V-81019:
```
Verify the audisp daemon is configured to take an appropriate action when the internal queue is full:

# grep "overflow_action" /etc/audisp/audispd.conf

overflow_action = syslog

If the "overflow_action" option is not "syslog", "single", or "halt", or the line is commented out, this is a finding.
```


V-81021:
```
Verify the audisp daemon is configured to label all off-loaded audit logs:

# grep "name_format" /etc/audisp/audispd.conf

name_format = hostname

If the "name_format" option is not "hostname", "fqd", or "numeric", or the line is commented out, this is a finding.
```


V-92251:
```
Verify the system uses a reverse-path filter for IPv4:

# grep net.ipv4.conf.all.rp_filter /etc/sysctl.conf /etc/sysctl.d/*
net.ipv4.conf.all.rp_filter = 1

If "net.ipv4.conf.all.rp_filter" is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out, or does not have a value of "1", this is a finding.

Check that the operating system implements the accept source route variable with the following command:

# /sbin/sysctl -a | grep net.ipv4.conf.all.rp_filter
net.ipv4.conf.all.rp_filter = 1

If the returned line does not have a value of "1", this is a finding.
```


V-92253:
```
Verify the system uses a reverse-path filter for IPv4:

# grep net.ipv4.conf.default.rp_filter /etc/sysctl.conf /etc/sysctl.d/*
net.ipv4.conf.default.rp_filter = 1

If "net.ipv4.conf.default.rp_filter" is not configured in the /etc/sysctl.conf file or in the /etc/sysctl.d/ directory, is commented out, or does not have a value of "1", this is a finding.

Check that the operating system implements the accept source route variable with the following command:

# /sbin/sysctl -a | grep net.ipv4.conf.default.rp_filter
net.ipv4.conf.default.rp_filter = 1

If the returned line does not have a value of "1", this is a finding.
```


V-92255:
```
Ask the SA or ISSO if a host-based intrusion detection application is loaded on the system. Per OPORD 16-0080, the preferred intrusion detection system is McAfee HBSS available through the U.S. Cyber Command (USCYBERCOM).

If another host-based intrusion detection application is in use, such as SELinux, this must be documented and approved by the local Authorizing Official.

Procedure:
Examine the system to determine if the Host Intrusion Prevention System (HIPS) is installed:

# rpm -qa | grep MFEhiplsm

Verify that the McAfee HIPS module is active on the system:

# ps -ef | grep -i “hipclient”

If the MFEhiplsm package is not installed, check for another intrusion detection system:

# find / -name <daemon name>

Where <daemon name> is the name of the primary application daemon to determine if the application is loaded on the system.

Determine if the application is active on the system:

# ps -ef | grep -i <daemon name>

If the MFEhiplsm package is not installed and an alternate host-based intrusion detection application has not been documented for use, this is a finding.

If no host-based intrusion detection system is installed and running on the system, this is a finding.
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


