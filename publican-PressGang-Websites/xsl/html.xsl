<?xml version='1.0'?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		version='1.0'
		xmlns="http://www.w3.org/1999/xhtml"
		exclude-result-prefixes="#default">

<xsl:import href="http://docbook.sourceforge.net/release/xsl/current/xhtml/docbook.xsl"/>
<xsl:import href="../../../xsl/html.xsl"/>

<xsl:param name="ulink.target">_blank</xsl:param>
<xsl:param name="suppress.navigation" select="1"/>

<xsl:template name="user.head.content">
   <script type="application/javascript">
   	addEventListener("message", function(event) {
   		try {
   			var payload = JSON.parse(event.data);
   			if (payload.message == "forward") {
   				history.foward();
   			} else if (payload.message == "back") {
   				history.back();
   			}
   		} catch {
   			// do nothing if the payload is invalid
   		}	
   	}, false);
   </script>
</xsl:template>

<xsl:template match="videodata">
    <iframe>
		<xsl:attribute name="webkitAllowFullScreen"/>
		<xsl:attribute name="mozallowfullscreen"/>
		<xsl:attribute name="allowFullScreen"/>
	    <xsl:attribute name="src">http://player.vimeo.com/video/<xsl:value-of select="@fileref"/></xsl:attribute>
	    <xsl:attribute name="height">
	            <xsl:value-of select="@contentdepth"/>
	    </xsl:attribute>
	    <xsl:attribute name="width">
	            <xsl:value-of select="@contentwidth"/>
	    </xsl:attribute>
    </iframe>
</xsl:template>
</xsl:stylesheet>

