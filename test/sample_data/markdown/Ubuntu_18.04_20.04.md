## Automattic Update:  -> 

### New Controls:
+   account_expiration - Set Account Expiration Following Inactivity
+   accounts-banners - Verify Group Ownership of System Login Banner
+   accounts-pam - Install pam_pwquality Package
+   accounts-physical - Disable Ctrl-Alt-Del Burst Action
+   accounts-session - Ensure the Logon Failure Delay is Set Correctly in login.defs
+   aide - Install AIDE
+   apparmor - Ensure AppArmor is Active and Configured
+   apport - Disable Apport Service
+   audit_execution_acl_commands - Record Any Attempts to Run chacl
+   audit_execution_selinux_commands - Record Any Attempts to Run chcon
+   audit_file_modification - Record Unsuccessful Access Attempts to Files - creat
+   audit_kernel_module_loading - Ensure auditd Collects Information on Kernel Module Unloading - delete_module
+   audit_login_events - Record Attempts to Alter Logon and Logout Events - faillog
+   audit_privileged_commands - Ensure auditd Collects Information on the Use of Privileged Commands
+   auditd_configure_rules - Make the auditd Configuration Immutable
+   auditing - Ensure the default plugins for the audit dispatcher are Installed
+   base - Disable KDump Kernel Crash Analyzer (kdump)
+   bootloader-zipl - Enable Auditing to Start Prior to the Audit Daemon in zIPL
+   configure_auditd_data_retention - Configure audispd Plugin To Send Logs To Remote Server
+   configuring_ipv6 - Configure Accepting Router Advertisements on All IPv6 Interfaces
+   console_screen_locking - Check that vlock is installed to allow session locking
+   coredumps - Disable core dump backtraces
+   cron_and_at - Install the cron service
+   disable_avahi_group - Disable Avahi Server Software
+   disabling_dhcp_server - Uninstall DHCP Server Package
+   disabling_dns_server - Uninstall bind Package
+   disabling_dovecot - Uninstall dovecot Package
+   disabling_httpd - Uninstall httpd Package
+   disabling_samba - Uninstall Samba Package
+   disabling_snmp_service - Uninstall net-snmp Package
+   disabling_squid - Uninstall squid Package
+   disabling_vsftpd - Uninstall vsftpd Package
+   disabling_xwindows - Remove the X Windows Package Group
+   disk_partitioning - Encrypt Partitions
+   ensure_rsyslog_log_file_configuration - Ensure Rsyslog Authenticates Off-Loaded Audit Records
+   files - Verify that All World-Writable Directories Have Sticky Bits Set
+   fips - Verify &#39;&#x2F;proc&#x2F;sys&#x2F;crypto&#x2F;fips_enabled&#39; exists
+   gnome - Remove the GDM Package Group
+   gnome_login_screen - Disable the GNOME3 Login User List
+   gnome_screen_locking - Enable GNOME3 Screensaver Lock After Idle Period
+   gnome_system_settings - Disable Ctrl-Alt-Del Reboot Key Sequence in GNOME3
+   gui_login_banner - Enable GNOME3 Login Warning Banner
+   inetd_and_xinetd - Uninstall xinetd Package
+   integrity - Disable Prelinking
+   locking_out_password_attempts - Limit Password Reuse
+   logging - Ensure rsyslog is Installed
+   mounting - Disable the Automounter
+   network-iptables - Install iptables Package
+   network-uncommon - Disable DCCP Support
+   network_host_and_router_parameters - Disable Accepting ICMP Redirects for All IPv4 Interfaces
+   network_host_parameters - Disable Kernel Parameter for Sending ICMP Redirects on all IPv4 Interfaces
+   non-uefi - Verify &#x2F;boot&#x2F;grub&#x2F;grub.cfg User Ownership
+   ntp - The Chrony package is installed
+   openldap_client - Ensure LDAP client is not installed
+   openldap_server - Uninstall openldap-servers Package
+   password_expiration - Set Password Maximum Age
+   password_quality_pwquality - Ensure PAM Enforces Password Requirements - Minimum Digit Characters
+   password_storage - Verify All Account Password Hashes are Shadowed
+   permissions_important_account_files - Verify Group Who Owns Backup group File
+   permissions_var_log_dir - Verify Group Who Owns &#x2F;var&#x2F;log Directory
+   permissions_within_important_dirs - Verify that Shared Library Directories Have Root Ownership
+   printing - Disable the CUPS Service
+   r_services - Uninstall rsh-server Package
+   restrict_at_cron_users - Verify Group Who Owns &#x2F;etc&#x2F;at.allow file
+   root_logins - Verify Only Root Has UID 0
+   set_password_hashing_algorithm - Set Password Hashing Algorithm in &#x2F;etc&#x2F;login.defs
+   smart_card_login - Install the opensc Package For Multifactor Authentication
+   ssh - Install the OpenSSH Server Package
+   ssh_server - Disable Host-Based Authentication
+   sssd - Configure SSSD to Expire Offline Credentials
+   sudo - Install sudo Package
+   talk - Uninstall talk Package
+   telnet - Remove telnet Clients
+   uefi - Set the UEFI Boot Loader Password
+   user_umask - Ensure the Default Bash Umask is Set Correctly
+   wireless_software - Deactivate Wireless Network Interfaces

### Updated Check/Fixes:
#### Checks:

