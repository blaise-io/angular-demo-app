bugtracker.directive('tooltip', [function() {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var tooltip = null;

            /**
             * @param {Event} event
             */
            function addTooltip(event) {
                if (attrs.tooltip.trim()) {
                    tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.appendChild(document.createTextNode(attrs.tooltip));
                    repositionTooltip(event);
                    document.body.appendChild(tooltip);
                }
            }

            function repositionTooltip(event) {
                if (tooltip) {
                    var s = tooltip.style;
                    s.left = String(event.clientX) + 'px';
                    s.top = String(event.clientY - tooltip.offsetHeight) + 'px';
                }
            }

            function removeTooltip() {
                if (tooltip) {
                    document.body.removeChild(tooltip);
                    tooltip = null;
                }
            }

            element[0].addEventListener('mouseenter', addTooltip);
            element[0].addEventListener('mousemove', repositionTooltip);
            element[0].addEventListener('mouseleave', removeTooltip);

            scope.$on('$destroy', function() {
                element[0].removeEventListener('mouseenter', addTooltip);
                element[0].removeEventListener('mousemove', repositionTooltip);
                element[0].removeEventListener('mouseleave', removeTooltip);
                removeTooltip();
            });
        }
    }

}]);
