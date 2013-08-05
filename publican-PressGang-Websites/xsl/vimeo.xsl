<?xml version='1.0'?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		version='1.0'
		xmlns="http://www.w3.org/1999/xhtml"
		exclude-result-prefixes="#default">
		
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