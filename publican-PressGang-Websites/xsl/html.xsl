<?xml version='1.0'?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		version='1.0'
		xmlns="http://www.w3.org/1999/xhtml"
		exclude-result-prefixes="#default">

<xsl:import href="http://docbook.sourceforge.net/release/xsl/current/xhtml/docbook.xsl"/>
<xsl:import href="../../../xsl/html.xsl"/>

<xsl:param name="ulink.target">_top</xsl:param>
<xsl:param name="suppress.navigation" select="1"/>

<xsl:template name="user.head.content">
   <script type="application/javascript">
   	window.addEventListener("message", function(event) {
   		try {
   			var payload = JSON.parse(event.data);
   			if (payload.message == "url") {
   					event.source.postMessage(window.location.pathname, event.origin);
   			}
   		} catch (ex) {
   			// do nothing if the payload is invalid
   		}	
   	}, false);
   </script>
</xsl:template>
</xsl:stylesheet>

